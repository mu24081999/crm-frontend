import { createSlice } from "@reduxjs/toolkit";

export const ratesSlice = createSlice({
  name: "plan_rates",
  initialState: {
    isLoading: false,
    planRates: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    ratesRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.planRates = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    updateRates: (state, action) => {
      state.isLoading = false;
      state.planRates = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addRates: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    readRate: (state, action) => {
      state.isLoading = false;
      state.planRates = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default ratesSlice.reducer;
export const {
  ratesRequestLoading,
  invalidRequest,
  addRates,
  updateRates,
  readRate,
} = ratesSlice.actions;
