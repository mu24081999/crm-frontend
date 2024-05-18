// authActions.js
import axios from "axios";
import {
  invalidRequest,
  getEmails,
  emailRequestLoading,
  updateEmail,
  sendEmail,
} from "../slices/email";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getEmailList =
  (token, user_email, page_size, page) => async (dispatch) => {
    try {
      dispatch(emailRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/user/email/get-emails/${user_email}/${page_size}/${page}`,
          config
        )
        .then((response) => {
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getEmails(response.data.data.emailsData));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const getEmailListByEmail = (token, data) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/email/get-emails-by-email`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getEmails(response.data.data.emailsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const sendEmailRec = (token, data) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/email/send-email`, data, config)
      .then((response) => {
        console.log(response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(sendEmail(response.data.message));
        // dispatch(getEmailList(token, data.from, 20, 1));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const sendEmailBulk = (token, data) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/email/send-email-bulk`, data, config)
      .then((response) => {
        console.log(response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(sendEmail(response.data.message));
        // dispatch(getEmailList(token, data.from, 20, 1));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateEmailRec = (token, emailId, data) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/email/update-email/${emailId}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateEmail(response.data.message));
        dispatch(getEmailList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteEmailRec = (token, email_id) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/email/delete-email/${email_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateEmail(response.data.message));
        dispatch(getEmailList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
