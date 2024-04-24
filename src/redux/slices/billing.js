import { createSlice } from "@reduxjs/toolkit";

export const billingSlice = createSlice({
  name: "billing",
  initialState: {
    isLoading: false,
    billings: [],
    billingDetails: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    billingRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.billings = [];
      state.billingDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllBillings: (state, action) => {
      state.isLoading = false;
      state.billings = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    addBilling: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    updateBilling: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    readBilling: (state, action) => {
      state.isLoading = false;
      state.billingDetails = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    deleteBilling: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default billingSlice.reducer;
export const {
  billingRequestLoading,
  addBilling,
  invalidRequest,
  getAllBillings,
  readBilling,
  deleteBilling,
  updateBilling,
} = billingSlice.actions;
