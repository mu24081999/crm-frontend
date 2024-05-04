import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    isLoading: false,
    files: [],
    fileDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    galleryRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.files = [];
      state.fileDetails = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllFiles: (state, action) => {
      state.isLoading = false;
      state.files = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    fileDetails: (state, action) => {
      state.isLoading = false;
      state.fileDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addFile: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteFile: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default gallerySlice.reducer;
export const {
  galleryRequestLoading,
  invalidRequest,
  getAllFiles,
  addFile,
  deleteFile,
  fileDetails,
} = gallerySlice.actions;
