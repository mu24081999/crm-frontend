// authActions.js
import axios from "axios";
import {
  invalidRequest,
  packageRequestLoading,
  addPackage,
  getPackages,
  packageDetails,
  updatePackage,
} from "../slices/packages";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storePackage = (token, data) => async (dispatch) => {
  try {
    dispatch(packageRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/packages/add-package`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addPackage(response.data.message));
        toast.success(response.data.message);
        dispatch(readPackage(token, response.data.data.id));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getPackagesList = (token) => async (dispatch) => {
  try {
    dispatch(packageRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/packages/get-packages`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getPackages(response.data.data.packages));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const readPackage = (token, package_id) => async (dispatch) => {
  try {
    dispatch(packageRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/packages/get-package/${package_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(packageDetails(response.data.data.packageDetails));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updatePackageRec =
  (token, package_id, data) => async (dispatch) => {
    try {
      dispatch(packageRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/packages/update-package/${package_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updatePackage(response.data.message));
          toast.success(response.data.message);
          dispatch(readPackage(token, response.data.data.id));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
