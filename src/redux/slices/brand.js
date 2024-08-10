import { createSlice } from "@reduxjs/toolkit";

export const brandslice = createSlice({
  name: "brand",
  initialState: {
    isLoading: false,
    brands: [],
    brandDetails: {},
    message: "",
    error: "",
    token: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    brandRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.brands = [];
      state.brandDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllBrands: (state, action) => {
      state.isLoading = false;
      state.brands = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    addUpdateBrand: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    readUserBrand: (state, action) => {
      state.isLoading = false;
      state.brandDetails = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    deleteBrand: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default brandslice.reducer;
export const {
  brandRequestLoading,
  addUpdateBrand,
  invalidRequest,
  getAllBrands,
  readUserBrand,
  deleteBrand,
} = brandslice.actions;
