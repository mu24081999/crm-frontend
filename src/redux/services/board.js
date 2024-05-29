// authActions.js
import axios from "axios";
import {
  invalidRequest,
  boardRequestLoading,
  boardDetails,
  addBoard,
  getAllBoards,
  deleteBoard,
  updateBoard,
} from "../slices/board";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeBoard = (token, data) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/board/post-board`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addBoard(response.data.message));
        toast.success(response.data.message);
        dispatch(getBoardList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getBoardList = (token) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/board/get-boards`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllBoards(response.data.data.boardsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getBoardDetails = (token, board_id) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/board/board-details/${board_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(boardDetails(response.data.data.boardData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateBoardRec = (token, board_id, data) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/board/board-update/${board_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateBoard(response.data.message));
        dispatch(getBoardList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteBoardRec = (token, board_id) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/board/delete-board/${board_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteBoard(response.data.message));
        dispatch(getBoardList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
