// authActions.js
import axios from "axios";
import {
  invalidRequest,
  postRequestLoading,
  getPosts,
  addPost,
  deletePost,
  readPost,
  updatePost,
} from "../slices/post";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storePost = (token, data) => async (dispatch) => {
  try {
    dispatch(postRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/post/add-post`, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addPost(response.data.message));
        toast.success(response.data.message);
        dispatch(getPostList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getPostList = (token) => async (dispatch) => {
  try {
    dispatch(postRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/post/get-posts`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getPosts(response.data.data.postsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getPostDetails = (token, post_id) => async (dispatch) => {
  try {
    dispatch(postRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/post/post-details/${post_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readPost(response.data.data.postData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updatePostRec = (token, post_id, data) => async (dispatch) => {
  try {
    dispatch(postRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/post/post-update/${post_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updatePost(response.data.message));
        dispatch(getPostList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deletePostRec = (token, post_id) => async (dispatch) => {
  try {
    dispatch(postRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/post/delete-post/${post_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deletePost(response.data.message));
        dispatch(getPostList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
