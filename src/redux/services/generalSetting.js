// authActions.js
import axios from "axios";
import {
  invalidRequest,
  settingRequestLoading,
  readSetting,
  addSetting,
  updateSetting,
} from "../slices/generalSetring";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const readSettingRec = (token, setting_id) => async (dispatch) => {
  try {
    dispatch(settingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/settings/get-setting/${setting_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readSetting(response.data.data.settingData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addSettingRec = (token, data) => async (dispatch) => {
  try {
    dispatch(settingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/settings/post-setting`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addSetting(response.data.message));
        dispatch(readSettingRec(token, response.data.data.id));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateSettingRec =
  (token, setting_id, data) => async (dispatch) => {
    try {
      dispatch(settingRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/settings/update-setting/${setting_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateSetting(response.data.message));
          dispatch(readSetting(token, response.data.data.id));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
