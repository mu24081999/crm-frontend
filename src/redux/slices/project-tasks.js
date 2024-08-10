import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    tasks: [],
    taskDetails: {},
    message: "",
    error: "",
    type: "",
    lastFetched: null,
  },
  reducers: {
    taskRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.tasks = [];
      state.taskDetails = {};
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    addTask: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    getTasks: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
      state.lastFetched = new Date().toISOString(); // Update the lastFetched field
    },
    deleteTask: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateTask: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    taskDetails: (state, action) => {
      state.isLoading = false;
      state.taskDetails = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default taskSlice.reducer;
export const {
  taskRequestLoading,
  invalidRequest,
  addTask,
  getTasks,
  deleteTask,
  taskDetails,
  updateTask,
} = taskSlice.actions;
