import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  IoLocationOutline,
  IoChatboxEllipses,
  IoCall,
  IoMailOutline,
} from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FcAbout } from "react-icons/fc";
import { getProductDetailsAPI } from "../Services/Operation/ProductAPI";
import { useSelector } from "react-redux";
import Modal from "../Components/Modal";

function ProductPage() {
  const { name, id } = useParams();
  const navigate = useNavigate();

  const [showContactNumber, setShowContactNumber] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);

  const { user, token } = useSelector((state) => state.auth);

  const location = useLocation();
  const usedFor = location.pathname.split("/")[2];

  async function getProductDetails() {
    try {
      const response = await getProductDetailsAPI(id, usedFor);
      if (response.status === 200) {
        setData(response?.data?.product_details);
      }
    } catch (error) {
      console.log("Error in getProductDetails: ", error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  function handleBuyNow(price, listedFor) {
    if (!user || !token) {
      setShowModal(true);
      return;
    } else {
      navigate(`/product-details/${usedFor}/${name}/pid_${id}/sell-product`, {
        state: { price: price, productId: id, listedFor: listedFor },
      });
    }
  }

  function handleBooking(data) {
    if (!user || !token) {
      setShowModal(true);
      return;
    } else {
      navigate(
        `/product-details/${usedFor}/${name}/pid_${id}/booking-product`,
        {
          state: { listedFor: data, productId: id },
        }
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-10 text-gray-800">
      <div className="grid md:grid-cols-2 gap-10">
        {Array.isArray(data) &&
          data.map((item, index) => {
            return (
              <div key={index} className="md:col-span-2">
                {/* Product Image and Info */}
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Product Image */}
                  <div>
                    <img
                      src={item?.product_image_url}
                      alt="product_image"
                      className="rounded-xl shadow-md w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-indigo-600">
                      {item?.product_name}
                    </h1>

                    <div className="bg-indigo-100 max-w-fit text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {item?.category_name}
                    </div>
                    <p className="text-gray-600 text-sm font-semibold">
                      {item?.category_description}
                    </p>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">Overview</h2>
                      <p className="flex items-center gap-2 text-gray-600">
                        <TbFileDescription className="text-indigo-500" />
                        {Array.isArray(item?.descriptions) &&
                          item?.descriptions.map((desc, index) => {
                            return (
                              <span key={index} className="text-gray-600">
                                {desc.description}
                                {index < item?.descriptions.length - 1 && (
                                  <span className="text-gray-400">{" , "}</span>
                                )}
                              </span>
                            );
                          })}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <IoLocationOutline className="text-indigo-500" />
                        {item?.product_location}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <SlCalender className="text-indigo-500" />
                        {item?.created_at}
                      </p>
                    </div>

                    <div>
                      <h2 className="flex items-center text-xl font-semibold text-gray-800 gap-2">
                        <FcAbout /> Description
                      </h2>
                      <p className="mt-2 text-gray-600 leading-relaxed">
                        {item?.details}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <h1 className="text-2xl font-bold text-green-600 flex items-center gap-1">
                        {location.pathname.includes("sell") ? (
                          <span>₹{item?.product_price}</span>
                        ) : (
                          <span>
                            ₹{item?.rent_price_per_hour}
                            {"/hr"}
                          </span>
                        )}
                      </h1>
                      {location.pathname.includes("sell") ? (
                        <button
                          onClick={() =>
                            handleBuyNow(item?.product_price, item?.listed_for)
                          }
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition cursor-pointer"
                        >
                          Buy Now
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBooking(item?.listed_for)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition cursor-pointer"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* User Info */}
                {String(user.id) === String(item?.owner_id) ? (
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/message/${name}/pid_${id}/${user?.firstName}${"_"}${
                            user?.lastName
                          }-${user?.id}`
                        )
                      }
                      className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg cursor-pointer"
                    >
                      <IoChatboxEllipses /> Chat With Buyer
                    </button>
                  </div>
                ) : (
                  <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Seller Info
                    </h2>
                    <p className="flex items-center gap-2 text-gray-700 text-sm">
                      <FaRegUserCircle className="text-indigo-500" />{" "}
                      {item?.first_name} {item?.last_name}
                    </p>

                    <div className="mt-4">
                      <h3 className="text-md font-semibold text-gray-800 mb-2">
                        Contact Seller
                      </h3>
                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/message/${name}/pid_${id}/${
                                user?.firstName
                              }${"_"}${user?.lastName}-${user?.id}`
                            )
                          }
                          className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg cursor-pointer"
                        >
                          <IoChatboxEllipses /> Chat With Seller
                        </button>
                        <a
                          href={`mailto:${item?.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg cursor-pointer"
                        >
                          <IoMailOutline /> Email Seller
                        </a>
                        <button
                          onClick={() =>
                            setShowContactNumber(!showContactNumber)
                          }
                          className="flex items-center gap-2 bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer"
                        >
                          <IoCall /> Call
                        </button>
                        {showContactNumber && (
                          <div className="flex items-center gap-2 bg-green-50 text-cyan-600 hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">
                            {item?.contact_no}
                            <button
                              onClick={() => setShowContactNumber(false)}
                              className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                            >
                              X
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {showModal && (
        <Modal
          btn1="Login"
          btn2="Cancel"
          heading="Login Required"
          text="You need to login to book a slot."
          onConfirm={() => {
            setShowModal(false);
            navigate("/login");
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ProductPage;
