import React from "react";

function PaymentSuccessModal({ data }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8"
      role="dialog"
      aria-labelledby="payment-success-title"
    >
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto mb-4"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
          <h2
            id="payment-success-title"
            className="text-3xl font-semibold text-gray-800"
          >
            Payment Successful
          </h2>
          <p className="text-gray-600 mt-2">
            Thank you for your payment. Your transaction was completed
            successfully and securely.
          </p>
        </div>

        {data && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
            <p>
              <span className="font-medium">Order ID:</span>{" "}
              {data?.order_id || "N/A"}
            </p>
            <p>
              <span className="font-medium">Payment ID:</span>{" "}
              {data?.payment_id || "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {data?.status || "Success"}
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium transition duration-200"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessModal;
