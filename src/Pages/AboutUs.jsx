import React from "react";

function AboutUs() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-indigo-600 text-center mb-6">
            About RentMate
          </h1>
          <p className="text-lg text-gray-700 text-center mb-12">
            At RentMate, our mission is to make everyday items accessible to
            everyone through a sustainable, peer-to-peer rental platform. We
            believe in the power of sharing and building community by connecting
            people who need items with those who already have them.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-indigo-500 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600">
                We envision a world where access is more valuable than
                ownership. By enabling users to rent items directly from each
                other, we’re reducing waste and encouraging responsible
                consumption.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-indigo-500 mb-4">
                Our Platform
              </h2>
              <p className="text-gray-600">
                RentMate is a modern, secure, and user-friendly platform built
                using the latest web technologies. Whether you’re a student,
                traveler, or entrepreneur — RentMate helps you save money, earn
                from your unused items, and build trust in your community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-indigo-500 mb-4">
                Why Choose Us?
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Secure transactions via Razorpay</li>
                <li>Verified user profiles and reviews</li>
                <li>Easy item management and calendar scheduling</li>
                <li>Eco-friendly, community-driven approach</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-indigo-500 mb-4">
                Join the Movement
              </h2>
              <p className="text-gray-600">
                Whether you want to lend your items, borrow something for a
                weekend, or just be part of a smarter way to share resources —
                RentMate is here to support you. Let’s build a circular economy
                together.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">Want to know more?</p>
            <a
              href="/contact-us"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Get in touch with us →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
