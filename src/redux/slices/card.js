import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    isLoading: false,
    cards: [],
    cardDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    cardRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.cards = [];
      state.cardDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllCards: (state, action) => {
      state.isLoading = false;
      state.cards = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    cardDetails: (state, action) => {
      state.isLoading = false;
      state.cardDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addCard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateCard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteBoard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default cardSlice.reducer;
export const {
  cardRequestLoading,
  invalidRequest,
  getAllCards,
  addCard,
  updateCard,
  deleteCard,
  cardDetails,
} = cardSlice.actions;
