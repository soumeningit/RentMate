import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sigin_page_image from "../assets/Sign_In_Page.png";
import { useDispatch } from "react-redux";
import { loginAPI } from "../Services/Operation/AuthAPI";
import toast from "react-hot-toast";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const response = await loginAPI(formData, dispatch);
      console.log("response from server : " + response);
      console.log("response from server : " + JSON.stringify(response));
      toast.dismiss(toastId);
      if (response.status === 200) {
        if (response.data.user.role === "admin") {
          navigate(`/dashboard/admin/profile/${response?.data?.user?.id}`);
        } else {
          navigate(`/dashboard/profile/${response?.data?.user?.id}`);
        }
        toast.success("Sign in Successful");
      }
    } catch (error) {
      toast.error("Sign in Failed");
      toast.dismiss(toastId);
      console.log("Sign in Failed" + error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center px-6 py-10">
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <img
          src={sigin_page_image}
          alt="Sign In Illustration"
          className="w-full max-w-xl mx-auto"
          loading="lazy"
        />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Sign in to continue exploring and managing your rentals with RentMate.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2 cursor-pointer text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="text-right">
            <Link
              to="/forget-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
