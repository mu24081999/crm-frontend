import { createSlice } from "@reduxjs/toolkit";

export const callingSlice = createSlice({
  name: "calling",
  initialState: {
    isLoading: false,
    availableNumbers: [],
    claimedNumbers: [],
    availableNumberDetails: {},
    claimedNumberDetails: {},
    call: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    callingRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.availableNumbers = [];
      state.claimedNumbers = [];
      state.availableNumberDetails = {};
      state.claimedNumberDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllAvailabelNumbers: (state, action) => {
      state.isLoading = false;
      state.availableNumbers = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    makeCall: (state, action) => {
      state.isLoading = false;
      state.call = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    searchAvailableNumber: (state, action) => {
      state.isLoading = false;
      state.availableNumbers = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    getAllClaimedNumbers: (state, action) => {
      state.isLoading = false;
      state.claimedNumbers = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    availableNumberDetails: (state, action) => {
      state.isLoading = false;
      state.availableNumberDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    claimedNumberDetails: (state, action) => {
      state.isLoading = false;
      state.claimedNumberDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addClaimedNumber: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateClaimedNumber: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteClaimedNumber: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default callingSlice.reducer;
export const {
  callingRequestLoading,
  invalidRequest,
  deleteClaimedNumber,
  updateClaimedNumber,
  addClaimedNumber,
  claimedNumberDetails,
  availableNumberDetails,
  getAllClaimedNumbers,
  getAllAvailabelNumbers,
  searchAvailableNumber,
  makeCall,
} = callingSlice.actions;
