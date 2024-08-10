import { createSlice } from "@reduxjs/toolkit";

export const brandslice = createSlice({
  name: "bundles",
  initialState: {
    isLoading: false,
    bundles: [],
    bundlesDetails: {},
    message: "",
    error: "",
    token: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    bundlesRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.bundles = [];
      state.bundlesDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllBundles: (state, action) => {
      state.isLoading = false;
      state.bunldes = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    getUserBundles: (state, action) => {
      state.isLoading = false;
      state.bundles = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    readBundle: (state, action) => {
      state.isLoading = false;
      state.bundlesDetails = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    addBundle: (state, action) => {
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
  bundlesRequestLoading,
  invalidRequest,
  addBundle,
  getAllBundles,
  readBundle,
  getUserBundles,
} = brandslice.actions;
