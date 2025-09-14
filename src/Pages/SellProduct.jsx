import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handlePaymentAPI } from "../Services/Operation/PaymentAPI";
import toast from "react-hot-toast";

function SellProduct() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { price, productId, listedFor } = location.state || {};

  const [contactNumber, setContactNumber] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      contactNumber: contactNumber,
      amount: price * 100,
      userId: user.id,
      productId: productId,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      listedFor: listedFor,
    };

    const toastId = toast.loading("Processing payment...");
    try {
      const response = await handlePaymentAPI(data, token, navigate, dispatch);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Payment successful!");
      }
      console.log("Response inside sell product: ", response);
    } catch (error) {
      console.error("Error in handlePaymentAPI: ", error);
      toast.dismiss(toastId);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              Amount to Pay:{" "}
              <span className="text-green-600">₹{price || "N/A"}</span>
            </p>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              required
              className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Pay Now</span>
            <svg
              className="w-5 h-5 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 1.343-3 3v1m0 0c0 1.657 1.343 3 3 3s3-1.343 3-3v-1c0-1.657-1.343-3-3-3zm5 4h2m-2 0h-2m2 0v6m0-6v-6"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellProduct;
