/* eslint-disable @next/next/no-img-element */
"use client";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      await axios.post("/api/cart", {
        productId: product.id,
        quantity,
      });
      toast({
        title: "Item added to cart",
        style: {
          backgroundColor: "lightgreen",
        },
      });
      setQuantity(1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={product.id}
      className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white hover:scale-105 transform  duration-300 ease-in-out h-96 w-64 flex flex-col mx-auto"
    >
      <div
        className="relative h-48 w-full mb-4 hover:cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          New
        </span>
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.title}
        </h2>
        <p className="text-lg text-gray-700 mb-4">${product.price}</p>
      </div>
      <div className="relative left-16 flex items-center space-x-2 mb-2">
        <button
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          className="px-2 bg-gray-200 rounded"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="px-2 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition mt-auto"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
