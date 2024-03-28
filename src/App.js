// src/App.js
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./assets/distt/css/style.css";
import Dialer from "./components/PhoneDialer/Dialer";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  document.getElementsByClassName("hk-sidebar-togglable");
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router(user?.role)} />;
    </>
  );
};

export default App;
