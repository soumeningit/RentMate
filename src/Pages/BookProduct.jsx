import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../Services/Operation/Booking";
import PaymentModal from "../Components/PaymentModal";
import { handlePaymentAPI } from "../Services/Operation/PaymentAPI";

function BookProduct() {
  const { user, token } = useSelector((state) => state.auth);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [price, setPrice] = useState();
  const [key, setKey] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();

  const [data, setData] = useState({
    time: "",
    date: "",
    contactNo: "",
    startTime: "",
    endTime: "",
    userId: user.id,
    productId: "",
  });
  const [showDiv, setShowDiv] = useState(false);

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const timeSlots = [];
  for (let hour = 9; hour < 22; hour++) {
    const start = hour.toString().padStart(2, "0") + ":00";
    const end = (hour + 1).toString().padStart(2, "0") + ":00";
    timeSlots.push(`${start} - ${end}`);
  }

  const handleSelectClick = () => {
    setShowDiv((prev) => !prev);
  };

  const handleTimeSelect = (selectedTime) => {
    setData((prevData) => ({
      ...prevData,
      time: selectedTime,
    }));
    setShowDiv(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const startTime = data.time.split(" - ")[0];
    const endTime = data.time.split(" - ")[1];

    const submitData = {
      ...data,
      startTime: startTime,
      endTime: endTime,
      productId: location.state.productId,
    };
    try {
      const response = await createBooking(submitData, token);
      if (response.status === 200) {
        setShowPaymentModal(true);
        setPrice(response?.data?.total_price);
        setKey(response?.data?.available_key);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const { listedFor, productId } = location.state || null;

  async function handlePayment() {
    const paymentData = {
      name: user.firstName + " " + user.lastName,
      email: user.email,
      productId: productId,
      amount: price * 100,
      userId: user.id,
      available_key: key,
      contactNumber: data.contactNo,
      listedFor: listedFor,
    };
    try {
      const response = await handlePaymentAPI(
        paymentData,
        token,
        navigate,
        dispatch
      );
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Book a Slot
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-semibold mb-2"
            >
              Select Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handleChange}
              value={data.date}
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {/* Time Selection */}
          <div className="relative">
            <label
              htmlFor="time"
              className="block text-gray-700 font-semibold mb-2"
            >
              Select Time
            </label>
            <div
              onClick={handleSelectClick}
              className="w-full p-3 border border-gray-300 rounded-md cursor-pointer bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {data.time || "Choose a time slot"}
            </div>

            <AnimatePresence>
              {showDiv && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-20 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  <div className="grid grid-cols-3 gap-2 p-3">
                    {timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        onClick={() => handleTimeSelect(slot)}
                        className="p-2 border rounded-md hover:bg-blue-500 hover:text-white cursor-pointer text-center transition-all duration-200"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contactNo"
              className="block text-gray-700 font-semibold mb-2"
            >
              Contact Number
            </label>
            <input
              type="text"
              name="contactNo"
              id="contactNo"
              onChange={handleChange}
              value={data.contactNo}
              required
              placeholder="Enter your contact number"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Book Now
          </button>
        </form>
      </div>
      {showPaymentModal && (
        <PaymentModal
          price={price}
          onConfirm={() => {
            setShowPaymentModal(false);
            handlePayment();
          }}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}

export default BookProduct;
