// authActions.js
import axios from "axios";
import {
  invalidRequest,
  getAllUsers,
  addUser,
  userRequestLoading,
  readUser,
  deleteUser,
  updateUser,
} from "../slices/users";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getUsers = (token) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios.get(`${backendURL}/user/get-users`, config).then((response) => {
      console.log("🚀 ~ .then ~ response:", response);
      if (response?.data?.statusCode !== 200) {
        return dispatch(invalidRequest(response.data.message));
      }
      dispatch(getAllUsers(response.data.data.usersData));
    });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserDetails = (token, user_id) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/user-details/${user_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readUser(response.data.data.userData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteUserRec = (token, user_id) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/delete-user/${user_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteUser(response.data.message));
        dispatch(getUsers(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addUserRec = (token, registerData) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/auth/signup_user`, registerData, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(addUser(response.data.message));
        dispatch(getUsers(token));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateUserRec = (token, data, user_id) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const is_updated = await axios
      .put(`${backendURL}/user/update-user-details/${user_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(updateUser(response.data.message));
        dispatch(getUsers(token));
        // Cookie.set("token", response.data.data.token);
        return true;
      });
    return is_updated;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
