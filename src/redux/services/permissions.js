// authActions.js
import axios from "axios";
import {
  invalidRequest,
  getAllPermissions,
  addPermissions,
  permissionRequestLoading,
  readPermissions,
  deletePermissions,
  updatePermissions,
} from "../slices/permissions";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const storePermissions = (token, data) => async (dispatch) => {
  try {
    dispatch(permissionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/permissions/add-permissions`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(addPermissions(response.data.message));
        dispatch(getUserPermissionDetails(token, data.subaccount_id));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserPermissionDetails =
  (token, subaccount_id) => async (dispatch) => {
    try {
      dispatch(permissionRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/user/permissions/get-user-permissions/${subaccount_id}`,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(readPermissions(response.data.data.permissionDetails));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
