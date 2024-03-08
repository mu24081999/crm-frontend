import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    isLoading: false,
    invoices: [],
    invoiceDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    invoiceRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.invoices = [];
      state.invoiceDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllInvoices: (state, action) => {
      state.isLoading = false;
      state.invoices = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    invoiceDetials: (state, action) => {
      state.isLoading = false;
      state.invoiceDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addInvoice: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateInvoice: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteInvoice: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default invoiceSlice.reducer;
export const {
  invoiceRequestLoading,
  invalidRequest,
  getAllInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  invoiceDetials,
} = invoiceSlice.actions;
