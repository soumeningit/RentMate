import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Map from "./Components/Map";
import NearbyMedicineShops from "./Components/NearbyMedicineShops";
import Navbar from "./Components/Navbar";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Registration from "./Pages/Registration";
import SignIn from "./Pages/SignIn";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import ProductPage from "./Pages/ProductPage";
import ChatPage from "./Pages/ChatPage";
import CreateProduct from "./Pages/CreateProduct";
import CartPage from "./Pages/CartPage";
import UserProfile from "./Pages/Dashboard/UserProfile";
import Notifications from "./Pages/Dashboard/Notifications";
import Dashboard from "./Pages/Dashboard/Dashboard";
import OTP from "./Pages/OTP";
import Error from "./Pages/Error";
import VerifyUser from "./Pages/Dashboard/VerifyUser";
import ChatTestPage from "./Pages/ChatTestPage";
import BookProduct from "./Pages/BookProduct";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Setting from "./Pages/Dashboard/Setting";
import SellProduct from "./Pages/SellProduct";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminNotifications from "./Pages/Admin/AdminNotifications";
import Products from "./Pages/Dashboard/Products";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/otp_verification" element={<OTP />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/map" element={<Map />} />
        <Route path="/nearby-shops" element={<NearbyMedicineShops />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/product-details/:used_for/:name/:id"
          element={<ProductPage />}
        />
        <Route
          path="/product-details/:used_for/:name/:id/booking-product"
          element={<BookProduct />}
        />
        <Route
          path="/product-details/:used_for/:name/:id/sell-product"
          element={<SellProduct />}
        />
        <Route
          path="/message/:product_name/:product_id/:user/"
          element={<ChatPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/chat-message" element={<ChatTestPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="my-profile" element={<UserProfile />} />
          <Route path="settings" element={<Setting />} />
          <Route path="verify_user" element={<VerifyUser />} />
          <Route
            path="sell_product/create_product"
            element={<CreateProduct />}
          />
          <Route
            path="rent_product/create_product"
            element={<CreateProduct />}
          />
          <Route path="admin/dashboard/:id" element={<AdminDashboard />} />
          <Route path="admin/profile/:id" element={<UserProfile />} />
          <Route path="admin/notifications" element={<AdminNotifications />} />
          <Route path="user/products" element={<Products />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
