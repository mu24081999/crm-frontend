import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    users: [],
    userDetails: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    userRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllUsers: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    addUser: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    updateUser: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    readUser: (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
    deleteUser: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default userSlice.reducer;
export const {
  userRequestLoading,
  addUser,
  invalidRequest,
  getAllUsers,
  readUser,
  deleteUser,
  updateUser,
} = userSlice.actions;
