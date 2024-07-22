import { createSlice } from "@reduxjs/toolkit";

export const verificationSlice = createSlice({
  name: "verification",
  initialState: {
    isLoading: false,
    verifications: [],
    verificationDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    verificationRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.verifications = [];
      state.verificationDetails = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllVerifications: (state, action) => {
      state.isLoading = false;
      state.verifications = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    verificationDetails: (state, action) => {
      state.isLoading = false;
      state.verificationDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addVerification: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateVerification: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default verificationSlice.reducer;
export const {
  verificationRequestLoading,
  invalidRequest,
  getAllVerifications,
  verificationDetails,
  addVerification,
  updateVerification,
} = verificationSlice.actions;
