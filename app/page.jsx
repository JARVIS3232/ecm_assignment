import ProductCard from "@/components/ProductCard";
import axios from "axios";

const fetchProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
    );
    return res.data.products;
  } catch (error) {
    console.log(error);
  }
};

const Home = async () => {
  let products = await fetchProducts();
  if (!products) {
    products = [];
  }
  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-center my-8">Product Showcase</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
