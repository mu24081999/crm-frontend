// authActions.js
import axios from "axios";
import {
  invalidRequest,
  callingRequestLoading,
  getAllAvailabelNumbers,
  searchAvailableNumber,
  makeCall,
} from "../slices/calling";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getAvailableNumbers = (token) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/calling/available-numbers`, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(
          getAllAvailabelNumbers(response.data.data.availablePhoneNumbers)
        );
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const makeUserToCall = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/make-call`, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(makeCall(response.data.data.callData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const searchAvailablePhoneNumber = (token, data) => async (dispatch) => {
  try {
    dispatch(callingRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calling/search-number`, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(
          getAllAvailabelNumbers(response.data.data.availablePhoneNumbers)
        );
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
