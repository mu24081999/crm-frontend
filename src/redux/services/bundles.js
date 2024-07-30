// authActions.js
import axios from "axios";
import {
  invalidRequest,
  addBundle,
  bundlesRequestLoading,
  getUserBundles,
  readBundle,
  getAllBundles,
} from "../slices/bundles";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getAllBundlesList = (token) => async (dispatch) => {
  try {
    dispatch(bundlesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/bundles/get-all-bundles`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllBundles(response.data.data.bundlesData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserBundlesList = (token, user_id) => async (dispatch) => {
  try {
    dispatch(bundlesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(
        `${backendURL}/user/bundles/get-user-regulatory-bundles/${user_id}`,
        config
      )
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserBundles(response.data.data.bundlesData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const readBundleRec = (token, bundle_id) => async (dispatch) => {
  try {
    dispatch(bundlesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(
        `${backendURL}/user/bundles/read-regulatory-bundle/${bundle_id}`,
        config
      )
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readBundle(response.data.data.bundlesData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const addBundleRec = (token, data) => async (dispatch) => {
  try {
    dispatch(bundlesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const is_done = await axios
      .post(`${backendURL}/user/bundles/create-regulatory-bundle`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(addBundle(response.data.message));
        dispatch(getUserBundlesList(token, data.user_id));
        // Cookie.set("token", response.data.data.token);
        return true;
      });
    return is_done;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
