// src/App.js
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "./assets/distt/css/style.css";
// import "./assets/vendors/daterangepicker/daterangepicker.css";
// import "./assets/vendors/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
// import "./assets/vendors/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
// import "./assets/vendors/dropify/dist/css/dropify.min.css";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";
// import "";

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
