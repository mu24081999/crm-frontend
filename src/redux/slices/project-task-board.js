import { createSlice } from "@reduxjs/toolkit";

export const taskBoardSlice = createSlice({
  name: "taskBoard",
  initialState: {
    isLoading: false,
    taskBoard: [],
    taskBoardDetails: {},
    message: "",
    error: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    taskBoardRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.taskBoard = [];
      state.taskBoardDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    addTaskBoard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    getTaskBoards: (state, action) => {
      state.isLoading = false;
      state.taskBoard = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    deleteTaskBoard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateTaskBoard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    taskBoardDetails: (state, action) => {
      state.isLoading = false;
      state.taskBoardDetails = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default taskBoardSlice.reducer;
export const {
  taskBoardRequestLoading,
  invalidRequest,
  addTaskBoard,
  getTaskBoards,
  deleteTaskBoard,
  taskBoardDetails,
  updateTaskBoard,
} = taskBoardSlice.actions;
