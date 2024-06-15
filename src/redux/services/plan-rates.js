// authActions.js
import axios from "axios";
import {
  invalidRequest,
  ratesRequestLoading,
  addRates,
  readRate,
  updateRates,
} from "../slices/plan-rates";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const addPlanRateRec = (token, data) => async (dispatch) => {
  try {
    dispatch(ratesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .post(`${backendURL}/user/rates/add-rate`, data, config)
      .then(async (response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        await dispatch(addRates(response.data.message));
        toast.success(response.data.message);
        await dispatch(readRateRec(token, 1));

        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updatePlanRec = (token, rate_id, data) => async (dispatch) => {
  try {
    dispatch(ratesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .put(`${backendURL}/user/rates/update-rate/${rate_id}`, data, config)
      .then(async (response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        await dispatch(updateRates(response.data.message));
        toast.success(response.data.message);
        await dispatch(readRateRec(token, 1));
        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const readRateRec = (token, rate_id) => async (dispatch) => {
  try {
    dispatch(ratesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/rates/plan-rate/${rate_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readRate(response.data.data.rateDetail));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
