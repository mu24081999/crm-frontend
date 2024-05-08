// authActions.js
import axios from "axios";
import { toast } from "react-toastify";
import {
  getPaymentIntent,
  paymentRequestLoading,
  invalidRequest,
  getPayments,
  getUserPayments,
  addPayment,
} from "../slices/payment";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const paymentIntent = (token, data) => async (dispatch) => {
  try {
    dispatch(paymentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/payments/create-payment`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getPaymentIntent(response.data.data.paymentData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const getUserAllPayments = (token, data) => async (dispatch) => {
  try {
    dispatch(paymentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/payments/get-user-payments`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserPayments(response.data.data.paymentsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const getAllPayments = (token, data) => async (dispatch) => {
  try {
    dispatch(paymentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/payments/get-payments`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getPayments(response.data.data.paymentsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const addPaymentRec = (token, data) => async (dispatch) => {
  try {
    dispatch(paymentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/payments/add_payment_record`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addPayment(response.data.message));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
