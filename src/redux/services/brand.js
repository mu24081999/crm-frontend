// authActions.js
import axios from "axios";
import {
  invalidRequest,
  addUpdateBrand,
  brandRequestLoading,
  getAllBrands,
  readUserBrand,
} from "../slices/brand";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getAllBrandsList = (token) => async (dispatch) => {
  try {
    dispatch(brandRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/brand/get-brands`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllBrands(response.data.data.brandsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserBrandRec = (token, user_id) => async (dispatch) => {
  try {
    dispatch(brandRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/brand/user-brand-details/${user_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readUserBrand(response.data.data.brandData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const addUpdateBrandRec = (token, data) => async (dispatch) => {
  try {
    dispatch(brandRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const is_done = await axios
      .post(`${backendURL}/user/brand/add-update-brand`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(addUpdateBrand(response.data.message));
        dispatch(getAllBrandsList(token));
        // Cookie.set("token", response.data.data.token);
        return true;
      });
    return is_done;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
