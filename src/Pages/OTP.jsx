import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signUpAPI } from "../Services/Operation/AuthAPI";
import toast from "react-hot-toast";

function OTP() {
  const { otpData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");

  const [showResendBtn, setShowResendBtn] = useState(false);
  const [timer, setTimer] = useState(5); // 5 seconds timer

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  function handleResendOTP() {
    // Logic to resend OTP
    console.log("Resending OTP...");
    setTimer(5); // Reset timer to 5 seconds
    setShowResendBtn(false);
  }

  async function submitOTP(e) {
    e.preventDefault();

    const data = {
      ...otpData,
      otp: otp,
    };
    const toastId = toast.loading("Verifying OTP...");
    try {
      const response = await signUpAPI(data);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error verifying OTP");
      console.log("Error submitting OTP", error);
    } finally {
      toast.dismiss(toastId);
      setOtp("");
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else {
      setShowResendBtn(true);
    }
  }, [timer]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Verify OTP
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter the OTP sent to your email:{" "}
          <span className="font-semibold">{otpData?.email || "unknown"}</span>
        </p>
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={submitOTP}
          type="button"
          disabled={!otp}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${
            !otp ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {" "}
          Verify OTP
        </button>
        <p className="mt-4 text-sm text-blue-600 hover:underline text-center cursor-pointer">
          {showResendBtn ? (
            <span onClick={handleResendOTP}>Resend OTP</span>
          ) : (
            <span>Resend OTP in {timer} seconds</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default OTP;
