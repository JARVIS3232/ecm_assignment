/* eslint-disable @next/next/no-img-element */
"use client";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      const cartRes = await axios.get("/api/cart");
      setCartItems(cartRes.data);
      const productIds = cartRes.data.map((item) => item.productId);
      const productsRes = await axios.get(
        `/api/products?ids=${productIds.join(",")}`
      );
      setProducts(productsRes.data);
    };

    fetchCartAndProducts();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleClearCart = async () => {
    try {
      const res = await axios.delete(`/api/cart`);
      if (res.data.success) {
        setCartItems([]);
        setProducts([]);
        toast({
          title: res.data.message,
          style: {
            backgroundColor: "lightgreen",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      {cartItems.length === 0 ? (
        <p className="text-center text-2xl font-bold">Your cart is empty</p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <button
              className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600 transition"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.productId}
                  className="flex items-center border-b pb-4"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600">
                      Price: ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-medium">
                      Subtotal: ${(product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t mt-4 pt-4">
            <h2 className="text-xl font-semibold">
              Total: ${getTotalPrice().toFixed(2)}
            </h2>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
