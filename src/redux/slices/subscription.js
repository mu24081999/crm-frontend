import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    isLoading: false,
    subscriptions: [],
    subscriptionDetails: {},
    subscription: {},
    message: "",
    error: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    subscriptionRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.subscriptions = [];
      state.subscriptionDetails = {};
      state.subscription = {};
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
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    getUserSubscription: (state, action) => {
      state.isLoading = false;
      state.subscription = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
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
