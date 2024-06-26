// src/App.js
import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscriptions } from "./redux/services/subscription";
import moment from "moment";
import { getUserKYCList } from "./redux/services/kyc";

const App = () => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const { subscriptions, isLoading } = useSelector(
    (state) => state.subscription
  );
  const [isKycApproved, setIsKycApproved] = useState(0);
  const { kycDetails } = useSelector((state) => state.kyc);

  const is_subscribed =
    moment(subscriptions[0]?.end_date).format("YYYY-MM-DDTHH:mm:ss") >
    moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss");
  useEffect(() => {
    dispatch(getUserSubscriptions(token));
    dispatch(getUserKYCList(token));
  }, [dispatch, token]);
  useEffect(() => {
    setIsKycApproved(kycDetails?.is_approved);
  }, [kycDetails]);
  return (
    <>
      <ToastContainer autoClose={1500} />
      <RouterProvider router={router(user, is_subscribed, isKycApproved)} />;
    </>
  );
};

export default App;
