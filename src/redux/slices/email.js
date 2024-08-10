import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    isLoading: false,
    emails: [],
    emailDetails: [],
    message: "",
    error: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    emailRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.contacts = [];
      state.emailDetails = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    sendEmail: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    getEmails: (state, action) => {
      state.isLoading = false;
      state.emails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    updateEmail: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteEmail: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default emailSlice.reducer;
export const {
  emailRequestLoading,
  invalidRequest,
  sendEmail,
  updateEmail,
  getEmails,
  deleteEmail,
} = emailSlice.actions;
