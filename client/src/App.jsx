import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import MainPage from "./components/MainPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin_Login from "./pages/Admin-login";
import BookDetails from "./pages/BookDetails";
import UserProfile from "./pages/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound";
import AdminProfile from "./pages/AdminProfile";
import Navbar from "./components/Navbar";

const App = () => {
  const { userData } = useSelector((state) => state.auth);
  console.log("Hi",userData);
  return (
    <div>
      {/* <Navbar/> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Routes>
        {/* common routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<Admin_Login />} />
        <Route path="/book/:id" element={<BookDetails />} />

        {/* user routes */}
        {userData ? (
          userData?.isAdmin !== true ? (
    <Route path="/profile" element={<UserProfile />} />
  ) : (
    <Route path="/profile" element={<AdminProfile />} />
  )
) : (
  <Route path="/profile" element={<Login />} />
)}


        {/* admin routes */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
