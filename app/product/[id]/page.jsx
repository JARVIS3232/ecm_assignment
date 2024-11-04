/* eslint-disable @next/next/no-img-element */
import axios from "axios";

async function fetchProduct(id) {
  try {
    const res = await axios.get(`http://localhost:3000/api/products?ids=${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

const ProductDetail = async ({ params }) => {
  const product = await fetchProduct((await params).id);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product[0].images[0]}
            alt={product[0].title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between lg:justify-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product[0].title}</h1>
            <p className="text-lg mb-4 text-gray-700">
              {product[0].description}
            </p>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              ${product[0].price}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Category:{" "}
              <span className="font-medium">{product[0].category}</span>
            </p>
            <p className="text-sm text-gray-500">
              Rating:{" "}
              <span className="font-medium">{product[0].rating} / 5</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

        {product[0].reviews.length > 0 ? (
          <div className="space-y-6">
            {product[0].reviews.map((review, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{review.reviewerName}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-yellow-400">
                    {"★".repeat(review.rating)}{" "}
                    <span className="text-gray-500">({review.rating} / 5)</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
