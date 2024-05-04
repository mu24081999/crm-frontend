// features/auth/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isLoading: false,
    payments: [],
    paymentDetails: {},
    paymentIntent: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    paymentRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.payments = [];
      state.paymentDetails = {};
      state.paymentIntent = {};
      state.message = action.payload;
      state.error = action.payload;
      state.type = "Invalid Request";
    },
    getPaymentIntent: (state, action) => {
      state.isLoading = false;
      state.paymentIntent = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default paymentSlice.reducer;
export const { paymentRequestLoading, invalidRequest, getPaymentIntent } =
  paymentSlice.actions;
