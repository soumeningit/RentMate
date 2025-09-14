import React, { useState } from "react";

function UpdatePassword() {
  const [emailForPasswordUpdate, setEmailForPasswordUpdate] = useState("");

  function handlePasswordReset(e) {
    e.preventDefault();
    console.log("Reset password link sent to", emailForPasswordUpdate);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
      <form onSubmit={handlePasswordReset} className="flex flex-col gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={emailForPasswordUpdate}
            onChange={(e) => setEmailForPasswordUpdate(e.target.value)}
            className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Send Reset Link</span>
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
