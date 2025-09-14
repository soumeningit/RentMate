import React from "react";
import { useNavigate } from "react-router-dom";
import { handlePaymentAPI } from "./Services/PaymentAPI";

function Other() {
  const navigate = useNavigate();

  async function handlePayment() {
    console.log("Payment button clicked");
    try {
      const response = await handlePaymentAPI();
      console.log("Payment response: ", response);
    } catch (error) {
      console.error("Error in handlePayment: ", error);
    }
  }
  return (
    <div>
      <h1>Other</h1>
      <h1 className="text-3xl font-bold underline text-center mt-10">Home</h1>
      <p className="text-center mt-5">Welcome to the Home Page!</p>
      <button
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-5 mx-auto block cursor-pointer"
      >
        PayNow
      </button>
      <button
        onClick={() => navigate("/map")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-5 mx-auto block cursor-pointer"
      >
        Go to Map
      </button>
      <button
        onClick={() => navigate("/nearby-shops")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-5 mx-auto block cursor-pointer"
      >
        Shops
      </button>
    </div>
  );
}

export default Other;
