"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkoutSchema } from "@/schema/checkoutSchema";

const Checkout = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.format();
      setFormErrors(errors);
      setIsProcessing(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/success");
      } else {
        router.push("/failure");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      router.push("/failure");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-xs">
              {formErrors.fullName._errors[0]}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs">
              {formErrors.email._errors[0]}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          {formErrors.address && (
            <p className="text-red-500 text-xs">
              {formErrors.address._errors[0]}
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {formErrors.city && (
              <p className="text-red-500 text-xs">
                {formErrors.city._errors[0]}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {formErrors.state && (
              <p className="text-red-500 text-xs">
                {formErrors.state._errors[0]}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {formErrors.zip && (
              <p className="text-red-500 text-xs">
                {formErrors.zip._errors[0]}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {formErrors.country && (
              <p className="text-red-500 text-xs">
                {formErrors.country._errors[0]}
              </p>
            )}
          </div>
        </div>
      </form>
      <button
        type="button"
        onClick={handleCheckout}
        className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Complete Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
