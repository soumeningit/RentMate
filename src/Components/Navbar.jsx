import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import user_avtar from "../assets/user_avtar.png";
import Modal from "./Modal";
import { logOut } from "../Redux/slices/authSlice";
import { logoutAPI } from "../Services/Operation/AuthAPI";
import { getUserDetailsAPI } from "../Services/Operation/ProfileAPI";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const count = 0;
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  async function handleLogout() {
    const toastId = toast.loading("Logging out...");
    try {
      const response = await logoutAPI();
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Logout successful");
        dispatch(logOut());
        setShowLogoutModal(false);
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Logout failed");
      console.error("Logout failed");
    } finally {
      setShowLogoutModal(false);
      toast.dismiss(toastId);
    }
  }

  function handleSell() {
    if (!token) {
      setShowModal(true);
    } else {
      navigate("/dashboard/sell_product/create_product");
    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              RentMate
            </Link>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-4 items-center">
            {!token && (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 text-sm font-medium border rounded-lg text-indigo-600 border-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                >
                  Login
                </button>
              </>
            )}
            {token && (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
              >
                LogOut
              </button>
            )}

            {/* Cart Icon with Animated Count */}
            {/* <div className="relative flex items-center">
              <p className="absolute -top-3 -right-3 text-xs rounded-full bg-green-500 text-white px-2 py-0.5 animate-bounce-slow">
                {count}
              </p>
              <button
                onClick={() => navigate("/cart")}
                className="text-gray-700 hover:text-indigo-600 text-2xl cursor-pointer relative"
              >
                <IoCartOutline />
              </button>
            </div> */}

            {/* Sell Button */}

            <button
              onClick={handleSell}
              className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group ml-4"
            >
              <div className="relative overflow-hidden">
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Sell Products
                </p>
                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Sell Products
                </p>
              </div>
            </button>

            {token && (
              <div className="flex items-center space-x-2">
                <img
                  src={user?.image || user_avtar}
                  alt="User Avatar"
                  onClick={() => navigate(`/dashboard/profile/${user?.id}`)}
                  className="w-8 h-8 rounded-full border-2 border-indigo-600 cursor-pointer"
                />
              </div>
            )}
          </div>
          {showModal && (
            <Modal
              btn1="Login"
              btn2="Cancel"
              heading={"Login Confirmation"}
              text="To sell products you need to login first?"
              onConfirm={() => {
                navigate("/login");
                setShowModal(false);
              }}
              onCancel={() => setShowModal(false)}
            />
          )}
          {showLogoutModal && (
            <Modal
              btn1="Logout"
              btn2="Cancel"
              heading={"Logout Confirmation"}
              text="Are you sure you want to logout?"
              onConfirm={() => {
                handleLogout();
              }}
              onCancel={() => setShowLogoutModal(false)}
            />
          )}
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
