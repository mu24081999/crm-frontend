// authActions.js
import axios from "axios";
import {
  invalidRequest,
  kycRequestLoading,
  kycDetails,
  addKyc,
  getAllKycs,
  deleteKyc,
  updateKyc,
} from "../slices/kyc";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeKyc = (token, data) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/kyc/post-kyc`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addKyc(response.data.message));
        toast.success(response.data.message);
        dispatch(getKYCList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getKYCList = (token) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/kyc/get-kycs`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllKycs(response.data.data.kycData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserKYCList = (token) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/kyc/get-user-kycs`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(kycDetails(response.data.data.kycData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getKycDetails = (token, form_id) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/kyc/kyc-details/${form_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(kycDetails(response.data.data.kycData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateKycRec = (token, form_id, data) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/kyc/kyc-update/${form_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateKyc(response.data.message));
        dispatch(getKYCList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteKycRec = (token, form_id) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/kyc/delete-kyc/${form_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteKyc(response.data.message));
        dispatch(getKYCList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
