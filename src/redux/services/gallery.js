// authActions.js
import axios from "axios";
import {
  invalidRequest,
  galleryRequestLoading,
  fileDetails,
  addFile,
  getAllFiles,
  deleteFile,
} from "../slices/gallery";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeFile = (token, data) => async (dispatch) => {
  console.log("🚀 ~ storeFile ~ data:", data);
  try {
    dispatch(galleryRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/gallery/post-file`, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addFile(response.data.message));
        toast.success(response.data.message);
        dispatch(getFileList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getFileList = (token) => async (dispatch) => {
  try {
    dispatch(galleryRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/gallery/get-files`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllFiles(response.data.data.galleryData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getFileDetails = (token, file_id) => async (dispatch) => {
  try {
    dispatch(galleryRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/gallery/file-details/${file_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(fileDetails(response.data.data.galleryData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteFileRec =
  (token, file_id, user_name) => async (dispatch) => {
    try {
      dispatch(galleryRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .delete(
          `${backendURL}/user/gallery/delete-file/${file_id}/${user_name}`,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.status !== 200) {
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(deleteFile(response.data.message));
          dispatch(getFileList(token));
          toast.success(response.data.message);
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
