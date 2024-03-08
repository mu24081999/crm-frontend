// authActions.js
import axios from "axios";
import {
  invalidRequest,
  eventRequstLoading,
  getEvents,
  addEvent,
  deleteEvent,
  readEvent,
} from "../slices/calendar_event";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeEvent = (token, data) => async (dispatch) => {
  try {
    dispatch(eventRequstLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/calendar/add-event`, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addEvent(response.data.message));
        toast.success(response.data.message);
        dispatch(getEventsList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getEventsList = (token) => async (dispatch) => {
  try {
    dispatch(eventRequstLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/calendar/get-events`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getEvents(response.data.data.eventsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getEventDetails = (token, event_id) => async (dispatch) => {
  try {
    dispatch(eventRequstLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/calendar/event-details/${event_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(readEvent(response.data.data.eventData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const deleteEventRec = (token, event_id) => async (dispatch) => {
  try {
    dispatch(eventRequstLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/calendar/delete-event/${event_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteEvent(response.data.message));
        dispatch(getEventsList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
