import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Arindam Chatterjee",
    rating: 5,
    review:
      "Rented a bike for my trip to Darjeeling—super smooth process and great condition!",
  },
  {
    id: 2,
    name: "Moumita Roy",
    rating: 4,
    review:
      "Ordered sarees online for Durga Puja, delivery was fast and quality was excellent!",
  },
  {
    id: 3,
    name: "Subhajit Das",
    rating: 5,
    review:
      "Booked a flat in Salt Lake through this platform. Hassle-free and very professional.",
  },
  {
    id: 4,
    name: "Ritika Banerjee",
    rating: 4,
    review:
      "Purchased kitchen appliances online. Got a great deal and timely delivery in Kolkata.",
  },
  {
    id: 5,
    name: "Anirban Sen",
    rating: 5,
    review:
      "Needed a room near Jadavpur University. Found one quickly with their rental listings!",
  },
  {
    id: 6,
    name: "Priyanka Mukherjee",
    rating: 5,
    review:
      "Bought Bengal handloom sarees from their shop—authentic and beautiful designs!",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const ReviewCard = ({ name, rating, review }) => (
  <div className="bg-white shadow-md rounded-lg p-6 m-4">
    <div className="flex items-center mb-4">
      <div className="text-yellow-500 flex">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    </div>
    <p className="text-gray-700 mb-4">"{review}"</p>
    <h3 className="text-gray-900 font-semibold">{name}</h3>
  </div>
);

const ReviewComponent = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name}
            rating={review.rating}
            review={review.review}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ReviewComponent;
