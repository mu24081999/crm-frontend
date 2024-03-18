// authActions.js
import axios from "axios";
import {
  getAllMessages,
  invalidRequest,
  messageRequestLoading,
} from "../slices/message";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getMessagesList = (token) => async (dispatch) => {
  try {
    dispatch(messageRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/calling/user-messages`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllMessages(response.data.data.messagesData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
