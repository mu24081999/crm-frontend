import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    isLoading: false,
    messages: [],
    message: "",
    error: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    messageRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.messages = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllMessages: (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
  },
});

export default messageSlice.reducer;
export const { messageRequestLoading, invalidRequest, getAllMessages } =
  messageSlice.actions;
