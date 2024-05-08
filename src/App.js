// src/App.js
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./assets/distt/css/style.css";
import Dialer from "./components/PhoneDialer/Dialer";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscriptions } from "./redux/services/subscription";
import moment from "moment";

const App = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { subscriptions, isLoading } = useSelector(
    (state) => state.subscription
  );

  const is_subscribed =
    moment(subscriptions[0]?.end_date).format("YYYY-MM-DDTHH:mm:ss") >
    moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss");
  useEffect(() => {
    dispatch(getUserSubscriptions(token));
  }, [dispatch, token]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router(user, is_subscribed)} />;
    </>
  );
};

export default App;
