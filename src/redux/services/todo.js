// authActions.js
import axios from "axios";
import {
  invalidRequest,
  todoRequestLoading,
  todoDetails,
  addTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
} from "../slices/todo";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeTodo = (token, data) => async (dispatch) => {
  try {
    dispatch(todoRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/todos/post-todo`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addTodo(response.data.message));
        toast.success(response.data.message);
        dispatch(getTodosList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTodosList = (token) => async (dispatch) => {
  try {
    dispatch(todoRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/todos/get-todos`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllTodos(response.data.data.todosData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTodoDetails = (token, todo_id) => async (dispatch) => {
  try {
    dispatch(todoRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/todos/todo-details/${todo_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(todoDetails(response.data.data.todoData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateTodoRec = (token, todo_id, data) => async (dispatch) => {
  try {
    dispatch(todoRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/todos/todo-update/${todo_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateTodo(response.data.message));
        dispatch(getTodosList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteTodoRec = (token, todo_id) => async (dispatch) => {
  try {
    dispatch(todoRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/todos/delete-todo/${todo_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteTodo(response.data.message));
        dispatch(getTodosList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
