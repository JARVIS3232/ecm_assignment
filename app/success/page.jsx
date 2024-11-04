"use client";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Success!</h1>
      <p className="text-lg text-gray-700">
        Your order has been placed successfully.
      </p>
      <div className="text-sm text-gray-500 mt-2">
        Thank you for shopping with us!
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
