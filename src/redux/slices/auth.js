// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: {},
    user_id: "",
    accountSid: "",
    accountAuthToken: "",
    message: "",
    error: "",
    token: "",
    type: "",
    isAuthenticated: false,
    isAdmin: false,
  },
  reducers: {
    authRequestLoading: (state, action) => {
      state.isLoading = true;
      // state.message = "";
      // state.error = "";
      // state.token = "";
      // state.isAuthenticated = false;
      // state.accountAuthToken = "";
      // state.accountSid = "";
      // state.type = "";
      // state.user_id = "";
      // state.user = {};
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "";
      state.isLoading = false;
      state.type = "InvalidRequest";
      state.user = {};
      state.user_id = "";
      state.token = "";
      state.isAuthenticated = false;
      state.accountAuthToken = "";
      state.accountSid = "";
    },
    login: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.user_id = action.payload.id;
      state.accountSid = action.payload.accountSid;
      state.accountAuthToken = action.payload.authToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
    },
    updatedMe: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.user_id = "";
      state.token = "";
      state.isLoading = false;
      state.error = "";
      state.message = action.payload;
      state.isAuthenticated = false;
      state.accountAuthToken = "";
      state.accountSid = "";
      state.type = "Success";
    },
    register: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.user_id = action.payload.id;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Registered Successfully.";
      state.type = "Success";
      state.accountAuthToken = "";
      state.accountSid = "";
    },
    forgotPassword: (state, action) => {
      state.user = "";
      state.token = "";
      state.user_id = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = "";
      state.message = action.payload;
      state.type = "Success";
      state.accountAuthToken = "";
      state.accountSid = "";
    },
    verifyOtp: (state, action) => {
      // state.user = "";
      // state.token = "";
      // state.user_id = "";
      // state.isAuthenticated = false;
      state.isLoading = false;
      // state.error = "";
      state.message = action.payload;
      state.type = "Success";
      // state.accountAuthToken = "";
      // state.accountSid = "";
    },
    resetPassword: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.user_id = action.payload.id;
      state.accountSid = action.payload.accountSid;
      state.accountAuthToken = action.payload.authToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
      state.accountAuthToken = "";
      state.accountSid = "";
    },
    reloadPage: (state, action) => {
      state.message = "";
      state.error = "";
    },
    setAccount: (state, action) => {
      state.user = action.payload;
      // state.token = action.payload.token;
      state.user_id = action.payload.id;
      state.accountSid = action.payload.accountSid;
      state.accountAuthToken = action.payload.authToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
    },
  },
});

export default authSlice.reducer;
export const {
  authRequestLoading,
  invalidRequest,
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  reloadPage,
  updatedMe,
  verifyOtp,
  setAccount,
} = authSlice.actions;
