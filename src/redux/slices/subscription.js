import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    isLoading: false,
    subscriptions: [],
    subscriptionDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    subscriptionRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.subscriptions = [];
      state.subscriptionDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getSubscriptions: (state, action) => {
      state.isLoading = false;
      state.subscriptions = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    getUserSubscription: (state, action) => {
      state.isLoading = false;
      state.subscriptions = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addSubscription: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    subscriptionDetails: (state, action) => {
      state.isLoading = false;
      state.subscriptionDetails = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default subscriptionSlice.reducer;
export const {
  subscriptionRequestLoading,
  invalidRequest,
  getSubscriptions,
  subscriptionDetails,
  getUserSubscription,
  addSubscription,
} = subscriptionSlice.actions;
