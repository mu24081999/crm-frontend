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
    lastFetched: null,
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
    getPayments: (state, action) => {
      state.isLoading = false;
      state.payments = action.payload;
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    getUserPayments: (state, action) => {
      state.isLoading = false;
      state.payments = action.payload;
      state.error = "";
      state.type = "success";
    },
    addPayment: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default paymentSlice.reducer;
export const {
  paymentRequestLoading,
  invalidRequest,
  getPaymentIntent,
  getPayments,
  getUserPayments,
  addPayment,
} = paymentSlice.actions;
