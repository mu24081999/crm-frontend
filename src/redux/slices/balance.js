import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    isLoading: false,
    balance: [],
    balanceDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    balanceRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.balance = [];
      state.balanceDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getUserBalance: (state, action) => {
      state.isLoading = false;
      state.balanceDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addBalance: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default balanceSlice.reducer;
export const {
  balanceRequestLoading,
  invalidRequest,
  getUserBalance,
  addBalance,
} = balanceSlice.actions;
