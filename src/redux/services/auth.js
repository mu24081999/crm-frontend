// authActions.js
import axios from "axios";
// import Cookie from "js-cookie";
import {
  invalidRequest,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  authRequestLoading,
  verifyOtp,
  twoFa,
} from "../slices/auth";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
const backendURL = process.env.REACT_APP_BACKEND_URL_PRODUCTION;
// const backendURL = process.env.REACT_APP_BACKEND_URL_LIVE;

export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
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
        dispatch(register(response.data.data.userData));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const loginUser =
  (username, password, type, authType, googleProfile) => async (dispatch) => {
    try {
      dispatch(authRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const is_login = await axios
        .post(
          `${backendURL}/auth/siginin_user`,
          { username, password, type, authType, googleProfile },
          config
        )
        .then((response) => {
          console.log(response.data);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            dispatch(invalidRequest(response.data.message));
            return toast.error(response.data.message);
          }
          toast.success(response.data.message);
          if (type || authType || googleProfile) {
            return dispatch(login(response.data.data.userData));
          }
          // dispatch(twoFa(response.data.data.userData));
          // Cookie.set("token", response.data.data.token);
          return response.data.data.userData;
        });
      return is_login;
    } catch (e) {
      dispatch(invalidRequest(e.message));
      toast.error(e.message);
    }
  };
export const logoutUser = (token) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    await axios
      .post(
        `${backendURL}/auth/signout_user`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token, // pass the cookie from the browser
          },
        }
      )
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          return toast.error(response.data.message);
        }
        dispatch(logout(response.data.message));
        return toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const ForgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const response = await axios.post(
      `${backendURL}/auth/forgot_password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      }
    );

    if (response?.data?.statusCode !== 200) {
      toast.error(response.data.message);
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }

    dispatch(forgotPassword(response.data.message));
    return toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
// export const ForgotPassword = (data) => async (dispatch) => {
//   try {
//     dispatch(authRequestLoading());
//     await axios
//       .post(`${backendURL}/auth/forgot_password`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Host": window.location.host,
//         },
//       })
//       .then((response) => {
//         if (response?.data?.statusCode !== 200) {
//           toast.error(response.data.message);
//           dispatch(invalidRequest(response.data.message));
//           return toast.error(response.data.message);
//         }
//         dispatch(forgotPassword(response.data.message));
//         console.log("success", response.data);
//         return toast.success(response.data.message);
//       });
//   } catch (e) {
//     dispatch(invalidRequest(e.message));
//     return toast.error(e.message);
//   }
// };
export const verifyOTP = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const verify_otp = await axios
      .post(`${backendURL}/auth/verify_otp`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          toast.error(response.data.message);
          return false;
        }
        dispatch(verifyOtp(response.data.message));
        toast.success(response.data.message);
        return true;
      });
    if (verify_otp) {
      return true;
    }
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const verifyEmail = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const verify_otp = await axios
      .post(`${backendURL}/auth/verify_email`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          return false;
        }
        dispatch(verifyOtp(response.data.message));
        toast.success(response.data.message);

        return response.data.data.userData;
      });
    if (verify_otp) {
      return verify_otp;
    }
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const ResetPassword = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const is_reset_password = await axios
      .post(`${backendURL}/auth/reset_password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          return toast.error(response.data.message);
        }
        // console.log(response);
        dispatch(resetPassword(response.data.data.userData));
        return toast.success(response.data.message);
      });
    console.log(is_reset_password);
    if (is_reset_password) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
export const getMe = (token) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/auth/get_me`, {}, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.data.error));
          return toast.error(response.data.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        dispatch(login(response.data));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       await axios
//         .post(`${backendURL}/api/user/signin`, { email, password }, config)
//         .then((res) => {
//           console.log(res);
//           login(res);
//         });
//     } catch (error) {
//       // return custom error message from backend if present
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
