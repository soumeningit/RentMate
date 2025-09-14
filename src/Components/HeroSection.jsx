import React from "react";
import hero_section_image from "../assets/HeroSection.png";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-white via-gray-100 to-gray-50 py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Rent Anything.{" "}
            <span className="text-indigo-600">Earn Anytime.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Join RentMate and start renting out your unused items or find what
            you need from people around you — securely and affordably.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#get-started"
              className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              Get Started
            </a>
            <a
              href="#explore"
              className="text-indigo-600 font-semibold text-lg hover:underline"
            >
              Explore Listings
            </a>
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="w-full max-w-md">
          <img
            src={hero_section_image}
            alt="Peer to Peer Renting"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
