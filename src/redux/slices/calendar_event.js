// features/auth/calenderEventSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const calenderEventSlice = createSlice({
  name: "calender_event",
  initialState: {
    isLoading: false,
    events: [],
    eventDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    eventRequstLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.events = [];
      state.eventDetails = {};
      state.message = action.payload;
      state.error = action.payload;
      state.type = "Invalid Request";
    },
    addEvent: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteEvent: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    getEvents: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.error = "";
      state.type = "success";
    },
    readEvent: (state, action) => {
      state.isLoading = false;
      state.eventDetails = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default calenderEventSlice.reducer;
export const {
  eventRequstLoading,
  invalidRequest,
  addEvent,
  deleteEvent,
  getEvents,
  readEvent,
} = calenderEventSlice.actions;
