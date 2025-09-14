import axios from "axios";
import React, { useState } from "react";
import { forgetPasswordAPI } from "../Services/Operation/AuthAPI";
import toast from "react-hot-toast";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    const toastId = toast.loading("Sending password reset link...");
    try {
      const response = await forgetPasswordAPI({ email });
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Password reset link sent to your email!");
      } else {
        alert("Failed to send password reset link. Please try again.");
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Error requesting password reset:", error);
    } finally {
      toast.dismiss(toastId);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
