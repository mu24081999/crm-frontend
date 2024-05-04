import { createSlice } from "@reduxjs/toolkit";

export const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    isLoading: false,
    kycs: [],
    kycDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    kycRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.kycs = [];
      state.kycDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllKycs: (state, action) => {
      state.isLoading = false;
      state.kycs = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    kycDetails: (state, action) => {
      state.isLoading = false;
      state.kycDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addKyc: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateKyc: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteKyc: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default kycSlice.reducer;
export const {
  kycRequestLoading,
  invalidRequest,
  getAllKycs,
  addKyc,
  updateKyc,
  deleteKyc,
  kycDetails,
} = kycSlice.actions;
