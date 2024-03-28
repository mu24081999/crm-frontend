// authActions.js
import axios from "axios";
import {
  invalidRequest,
  taskBoardRequestLoading,
  addTaskBoard,
  getTaskBoards,
  deleteTaskBoard,
  taskBoardDetails,
  updateTaskBoard,
} from "../slices/project-task-board";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const postTaskBoard = (token, data) => async (dispatch) => {
  try {
    dispatch(taskBoardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/board/task/board/post-task-board`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addTaskBoard(response.data.message));
        toast.success(response.data.message);
        dispatch(getTaskBoardList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTaskBoardList = (token) => async (dispatch) => {
  try {
    dispatch(taskBoardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/board/task/board/get-task-boards`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getTaskBoards(response.data.data.contactsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTaskBoardDetails =
  (token, task_board_id) => async (dispatch) => {
    try {
      dispatch(taskBoardRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/user/board/task/board//task-board-details/${task_board_id}`,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(taskBoardDetails(response.data.data.contactData));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };

export const updateTaskBoardRec =
  (token, task_board_id, data) => async (dispatch) => {
    try {
      dispatch(taskBoardRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/board/task/board/task-board-update/${task_board_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateTaskBoard(response.data.message));
          dispatch(getTaskBoardList(token));
          toast.success(response.data.message);
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const deleteTaskBoardRec =
  (token, task_board_id) => async (dispatch) => {
    try {
      dispatch(taskBoardRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/user/board/task/board/delete-task-board/${task_board_id}`,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(deleteTaskBoard(response.data.message));
          dispatch(getTaskBoardList(token));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
