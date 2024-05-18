import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    isLoading: false,
    tickets: [],
    ticketDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    ticketRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.tickets = [];
      state.ticketDetails = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllTickets: (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    ticketDetails: (state, action) => {
      state.isLoading = false;
      state.ticketDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addTicket: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateTicket: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteTicket: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default ticketSlice.reducer;
export const {
  ticketRequestLoading,
  invalidRequest,
  getAllTickets,
  addTicket,
  updateTicket,
  deleteTicket,
  ticketDetails,
} = ticketSlice.actions;
