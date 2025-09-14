import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Components/Modal";
import { contactUsAPI } from "../Services/Operation/UserResponseAPI";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setShowModal(true);
      return;
    } else if (formData.message.length > 250) {
      alert("Message should not exceed 250 characters. Please shorten it.");
      return;
    } else {
      const data = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        user_id: user.id,
      };

      console.log("Form Data: ", data);

      const response = await contactUsAPI(data, token);
      console.log("Response: ", response);
      if (response.status === 200) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-indigo-600 text-center mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 text-center mb-12">
            Have questions or feedback? We'd love to hear from you. Fill out the
            form below and our team will get back to you shortly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium cursor-pointer"
            >
              Send Message
            </button>
          </form>

          <div className="text-center mt-12 text-gray-600">
            <p>Or reach us directly at:</p>
            <p className="font-semibold">support@rentmate.com</p>
          </div>
        </div>
        {showModal && (
          <Modal
            btn1="Login"
            btn2="Cancel"
            heading={"Login Confirmation"}
            text="You need to login to send a message."
            onConfirm={() => {
              setShowModal(false);
              navigate("/login");
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default ContactUs;
