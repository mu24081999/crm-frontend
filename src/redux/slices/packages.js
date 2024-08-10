import { createSlice } from "@reduxjs/toolkit";

export const packageSlice = createSlice({
  name: "package",
  initialState: {
    isLoading: false,
    packages: [],
    packageDetails: {},
    message: "",
    error: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    packageRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.packages = [];
      state.packageDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getPackages: (state, action) => {
      state.isLoading = false;
      state.packages = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    packageDetails: (state, action) => {
      state.isLoading = false;
      state.packageDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addPackage: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updatePackage: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default packageSlice.reducer;
export const {
  packageRequestLoading,
  invalidRequest,
  addPackage,
  updatePackage,
  packageDetails,
  getPackages,
} = packageSlice.actions;
