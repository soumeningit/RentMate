import React from "react";
import PaymentSuccessModal from "../Components/PaymentSuccessModal";
import { useSelector } from "react-redux";

function PaymentSuccess() {
  const { paymentData } = useSelector((state) => state.payment);

  return (
    <>
      <PaymentSuccessModal data={paymentData} />
    </>
  );
}

export default PaymentSuccess;
