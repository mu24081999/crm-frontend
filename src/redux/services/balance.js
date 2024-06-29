// authActions.js
import axios from "axios";
import {
  invalidRequest,
  balanceRequestLoading,
  addBalance,
  getUserBalance,
} from "../slices/balance";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const addBalanceRec = (token, data) => async (dispatch) => {
  try {
    dispatch(balanceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .post(`${backendURL}/user/balance/add-balance`, data, config)
      .then(async (response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        await dispatch(addBalance(response.data.message));
        toast.success(response.data.message);
        await dispatch(getBalance(token));
        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const asignBalanceToUser = (token, data) => async (dispatch) => {
  try {
    dispatch(balanceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .post(`${backendURL}/user/balance/asign-balance`, data, config)
      .then(async (response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        await dispatch(addBalance(response.data.message));
        toast.success(response.data.message);
        await dispatch(getBalance(token));
        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const getBalance = (token) => async (dispatch) => {
  try {
    dispatch(balanceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/balance/get-user-balance`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserBalance(response.data.data.balanceData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
