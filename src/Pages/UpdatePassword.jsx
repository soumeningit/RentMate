import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updatePasswordAPI } from "../Services/Operation/AuthAPI";
import toast from "react-hot-toast";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { token } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Updating password to:", newPassword);

    const data = {
      token: token,
      password: confirmPassword,
    };

    const toastId = toast.loading("Updating password...");
    try {
      const response = await updatePasswordAPI(data);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        alert("Failed to update password. Please try again.");
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    } finally {
      toast.dismiss(toastId);
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
