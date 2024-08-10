// features/auth/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    posts: [],
    postDetails: {},
    message: "",
    error: "",
    type: "",
    lastFeched: null,
  },
  reducers: {
    postRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.postDetails = {};
      state.message = action.payload;
      state.error = action.payload;
      state.type = "Invalid Request";
    },
    addPost: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updatePost: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deletePost: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    getPosts: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    readPost: (state, action) => {
      state.isLoading = false;
      state.postDetails = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default postSlice.reducer;
export const {
  postRequestLoading,
  invalidRequest,
  addPost,
  updatePost,
  deletePost,
  getPosts,
  readPost,
} = postSlice.actions;
