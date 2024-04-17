// authActions.js
import axios from "axios";
import { toast } from "react-toastify";
import {
  getPaymentIntent,
  paymentRequestLoading,
  invalidRequest,
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
