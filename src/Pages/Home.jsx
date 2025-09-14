import React from "react";
import HeroSection from "../Components/HeroSection";
import Rent from "../Components/Rent";
import Sell from "../Components/Sells";
import Footer from "../Components/Footer";
import ReviewComponent from "../Components/ReviewComponent";

function Home() {
  return (
    <div>
      <HeroSection />
      <Rent />
      <Sell />
      <ReviewComponent />
      <Footer />
    </div>
  );
}

export default Home;
