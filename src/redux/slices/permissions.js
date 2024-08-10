import { createSlice } from "@reduxjs/toolkit";

export const permissionSlice = createSlice({
  name: "permissions",
  initialState: {
    isLoading: false,
    permissions: [],
    permissionDetails: {},
    message: "",
    error: "",
    token: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    permissionRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.permissions = [];
      state.permissionDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllPermissions: (state, action) => {
      state.isLoading = false;
      state.permissions = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    addPermissions: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    updatePermissions: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    readPermissions: (state, action) => {
      state.isLoading = false;
      state.permissionDetails = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    deletePermissions: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default permissionSlice.reducer;
export const {
  permissionRequestLoading,
  addPermissions,
  invalidRequest,
  getAllPermissions,
  readPermissions,
  deletePermissions,
  updatePermissions,
} = permissionSlice.actions;
