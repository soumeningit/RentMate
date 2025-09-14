import React, { useState } from "react";
import registration_page from "../assets/Registration_Page.png";
import { countryCode } from "../Util/CountryCode";
import { Link, useNavigate } from "react-router-dom";
import { sendOTPAPI } from "../Services/Operation/AuthAPI";
import { useDispatch } from "react-redux";
import { setOtpData } from "../Redux/slices/authSlice";
import toast from "react-hot-toast";

function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    code: "",
    contactNo: "",
    userType: "",
    password: "",
    confirmPassword: "",
    address: "",
    state: "",
    pincode: "",
    country: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleRegistration(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const toastId = toast.loading("Sending OTP...");
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      const response = await sendOTPAPI(data);
      toast.dismiss(toastId);
      if (response.status === 200) {
        dispatch(setOtpData(formData));
        navigate("/otp_verification");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to send OTP. Please try again.");
      console.error("Error in handleRegistration: ", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center px-6 py-10">
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <img
          src={registration_page}
          alt="Registration Illustration"
          className="w-full max-w-xl mx-auto"
          loading="lazy"
        />
      </div>

      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Join RentMate and start your journey to renting or lending items
          securely and easily.
        </p>

        <form onSubmit={handleRegistration} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-1/2 px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-1/2 px-4 py-2 border rounded-lg"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="flex gap-4">
            <select
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="w-1/3 px-4 py-2 border rounded-lg"
            >
              {countryCode.map((country) => (
                <option key={country.code} value={country.dial_code}>
                  {country.name} ({country.dial_code})
                </option>
              ))}
            </select>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Contact Number"
              required
              className="w-2/3 px-4 py-2 border rounded-lg"
            />
          </div>

          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select User Type</option>
            <option value="user">User</option>
            <option value="staff">Staff</option>
          </select>

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Country</option>
            {countryCode.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-2 cursor-pointer text-sm text-gray-500"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            Register
          </button>
          <Link to={"/login"}>
            Already have an account?{" "}
            <span className="text-indigo-600 mt-4 hover:underline">
              Click here to Login
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Registration;
