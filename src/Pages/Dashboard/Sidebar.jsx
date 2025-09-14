import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDashboardComponents } from "../../Util/DashboardComponent";
import { ImProfile } from "react-icons/im";
import { IoNotificationsCircleOutline, IoMenu, IoClose } from "react-icons/io5";
import Modal from "../../Components/Modal";
import { logoutAPI } from "../../Services/Operation/AuthAPI";
import { logOut } from "../../Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSell } from "react-icons/md";
import { IoSettingsOutline, IoCartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { GoCheckbox } from "react-icons/go";
import { AiTwotoneShopping } from "react-icons/ai";
import toast from "react-hot-toast";

const iconMap = {
  ImProfile: <ImProfile size={24} />,
  IoNotificationsCircleOutline: <IoNotificationsCircleOutline size={24} />,
  MdOutlineSell: <MdOutlineSell size={24} />,
  IoSettingsOutline: <IoSettingsOutline size={24} />,
  IoCartOutline: <IoCartOutline size={24} />,
  IoLogOutOutline: <IoLogOutOutline size={24} />,
  GoCheckbox: <GoCheckbox size={24} />,
  AiTwotoneShopping: <AiTwotoneShopping size={24} />,
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  let dashboardComponents;
  if (user.role === "admin") {
    const allComponents = getDashboardComponents(user?.id);
    dashboardComponents = allComponents.filter(
      (component) => component.role === user.role
    );
  } else if (user.role === "user") {
    const allComponents = getDashboardComponents(user?.id);
    dashboardComponents = allComponents.filter(
      (component) => component.role === user.role
    );
  } else {
    const allComponents = getDashboardComponents(user?.id);
    dashboardComponents = allComponents.filter(
      (component) => component.role === "all"
    );
  }

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
        toast.dismiss(toastId);
        console.log("Logout failed: ", response.data);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log("Logout failed: ", error);
    } finally {
      toast.dismiss(toastId);
      setShowLogoutModal(false);
    }
  }

  return (
    <div
      className={`transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } bg-indigo-700 text-white h-screen flex flex-col justify-between min-h-screen`}
    >
      <div className="flex flex-col items-center px-2 pt-4 space-y-4">
        {/* Toggle Sidebar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white self-end mr-2 mb-4 text-2xl hover:text-gray-300"
        >
          {isOpen ? (
            <IoClose className="cursor-pointer" />
          ) : (
            <IoMenu className="cursor-pointer" />
          )}
        </button>

        {dashboardComponents.map((component) => (
          <div
            key={component.id}
            onClick={() => navigate(component.link)}
            className={`w-full flex items-center gap-3 cursor-pointer py-2 px-4 rounded-lg hover:bg-indigo-600 transition ${
              location.pathname === component.link ? "bg-indigo-600" : ""
            }`}
          >
            <div className="text-white">{iconMap[component.icon]}</div>
            {isOpen && (
              <span className="text-sm font-medium">{component.name}</span>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={() => {
            setShowLogoutModal(!showLogoutModal);
            console.log("Logout");
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition cursor-pointer"
        >
          <span className="flex space-x-4 items-center justify-center">
            <IoLogOutOutline className="mr-2 mt-1 text-xl" />
            Logout
          </span>
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
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
