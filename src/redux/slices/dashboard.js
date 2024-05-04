import { createSlice } from "@reduxjs/toolkit";

export const dashboardRoutes = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
    dashboardData: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    dashboardRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.dashboardData = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getDashboard: (state, action) => {
      state.isLoading = false;
      state.dashboardData = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
  },
});

export default dashboardRoutes.reducer;
export const { dashboardRequestLoading, invalidRequest, getDashboard } =
  dashboardRoutes.actions;
