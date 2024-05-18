// authActions.js
import axios from "axios";
import {
  invalidRequest,
  ticketRequestLoading,
  ticketDetails,
  addTicket,
  getAllTickets,
  deleteTicket,
  updateTicket,
} from "../slices/ticket";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeTicket = (token, data) => async (dispatch) => {
  try {
    dispatch(ticketRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/ticket/post-ticket`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addTicket(response.data.message));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTicketList = (token) => async (dispatch) => {
  try {
    dispatch(ticketRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/ticket/get-tickets`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllTickets(response.data.data.ticketsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getTicketDetails = (token, ticket_id) => async (dispatch) => {
  try {
    dispatch(ticketRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/ticket/ticket-details/${ticket_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(ticketDetails(response.data.data.ticketDetails));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateTicketRec = (token, ticket_id, data) => async (dispatch) => {
  try {
    dispatch(ticketRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/ticket/ticket-update/${ticket_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateTicket(response.data.message));
        dispatch(getTicketList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteTicketRec = (token, ticket_id) => async (dispatch) => {
  try {
    dispatch(ticketRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/ticket/delete-ticket/${ticket_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteTicket(response.data.message));
        dispatch(getTicketList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
