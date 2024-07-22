// authActions.js
import axios from "axios";
import {
  invalidRequest,
  verificationRequestLoading,
  getAllVerifications,
  addVerification,
  verificationDetails,
  updateVerification,
} from "../slices/verification";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeVerification = (token, data) => async (dispatch) => {
  try {
    dispatch(verificationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .post(
        `${backendURL}/user/verifications/create-a2p-verification`,
        data,
        config
      )
      .then(async (response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        await dispatch(addVerification(response.data.message));
        toast.success(response.data.message);
        await dispatch(getVerificationsList(token));
        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getVerificationsList = (token) => async (dispatch) => {
  try {
    dispatch(verificationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/verifications/get-verifications`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllVerifications(response.data.data.verifications));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getVerificationDetails = (token, user_id) => async (dispatch) => {
  try {
    dispatch(verificationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(
        `${backendURL}/user/verifications/read-verification/${user_id}`,
        config
      )
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(verificationDetails(response.data.data.verificationData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateVerificationRec =
  (token, verification_id, data) => async (dispatch) => {
    try {
      dispatch(verificationRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/verifications/update-a2p-verification/${verification_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateVerification(response.data.message));
          dispatch(getVerificationsList(token));
          toast.success(response.data.message);
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
