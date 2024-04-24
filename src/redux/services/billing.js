// authActions.js
import axios from "axios";
import {
  invalidRequest,
  billingRequestLoading,
  readBilling,
  addBilling,
  updateBilling,
  deleteBilling,
  getAllBillings,
} from "../slices/billing";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const addBillingRec = (token, data) => async (dispatch) => {
  try {
    dispatch(billingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/billing/add-billing`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addBilling(response.data.message));
        toast.success(response.data.message);
        dispatch(getBillingsList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getBillingsList = (token) => async (dispatch) => {
  try {
    dispatch(billingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/billing/get-user-billing`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllBillings(response.data.data.billingsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const readBillingRec = (token, billing_id) => async (dispatch) => {
  try {
    dispatch(billingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/billing/billing-details/${billing_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readBilling(response.data.data.billingData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateBillingRec =
  (token, billing_id, data) => async (dispatch) => {
    try {
      dispatch(billingRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/billing/billing-update/${billing_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateBilling(response.data.message));
          dispatch(getBillingsList(token));
          toast.success(response.data.message);
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const deleteBillingRec = (token, billing_id) => async (dispatch) => {
  try {
    dispatch(billingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/billing/delete-billing/${billing_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteBilling(response.data.message));
        dispatch(getBillingsList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
