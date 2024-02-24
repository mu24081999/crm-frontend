// authActions.js
import axios from "axios";
import {
  invalidRequest,
  taskRequestLoading,
  addTask,
  getTasks,
  deleteTask,
  taskDetails,
  updateTask,
} from "../slices/project-tasks";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const postTask = (token, data) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/board/task/post-task`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.code === 404) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addTask(response.data.message));
        toast.success(response.data.message);
        dispatch(getTasksList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTasksList = (token) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/board/task/get-tasks`, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getTasks(response.data.data.tasksData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTaskDetails = (token, task_id) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/board/task//task-details/${task_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(taskDetails(response.data.data.taskData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateTaskRec = (token, task_id, data) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/board/task/task-update/${task_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateTask(response.data.message));
        dispatch(getTasksList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteTaskRec = (token, task_id) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/board/task/delete-task/${task_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteTask(response.data.message));
        dispatch(getTasksList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
