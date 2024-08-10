import { createSlice } from "@reduxjs/toolkit";

export const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    isLoading: false,
    pricing: {},
    message: "",
    error: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    pricingRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.pricing = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getPricing: (state, action) => {
      state.isLoading = false;
      state.pricing = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
  },
});

export default pricingSlice.reducer;
export const { pricingRequestLoading, invalidRequest, getPricing } =
  pricingSlice.actions;
