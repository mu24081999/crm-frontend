import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    todos: [],
    todoDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    todoRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.todos = [];
      state.todoDetails = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllTodos: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    todoDetails: (state, action) => {
      state.isLoading = false;
      state.todoDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addTodo: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateTodo: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteTodo: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default todoSlice.reducer;
export const {
  todoRequestLoading,
  invalidRequest,
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  todoDetails,
} = todoSlice.actions;
