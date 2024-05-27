import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    isLoading: false,
    notifications: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    notificationRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.notifications = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getUserNotifications: (state, action) => {
      state.isLoading = false;
      state.notifications = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default notificationSlice.reducer;
export const {
  notificationRequestLoading,
  invalidRequest,
  getUserNotifications,
} = notificationSlice.actions;
