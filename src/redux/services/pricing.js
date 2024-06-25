// authActions.js
import axios from "axios";
import {
  invalidRequest,
  pricingRequestLoading,
  getPricing,
} from "../slices/pricing";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getPricingServices = (token, data) => async (dispatch) => {
  try {
    dispatch(pricingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .post(`${backendURL}/user/dashboard/get-pricing`, data, config)
      .then(async (response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        await dispatch(getPricing(response.data.data.pricingData));
        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
