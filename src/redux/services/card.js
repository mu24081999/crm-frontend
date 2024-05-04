// authActions.js
import axios from "axios";
import {
  invalidRequest,
  cardRequestLoading,
  cardDetails,
  addCard,
  getAllCards,
  deleteCard,
  updateCard,
} from "../slices/card";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeCard = (token, data) => async (dispatch) => {
  try {
    dispatch(cardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/cards/post-card`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addCard(response.data.message));
        toast.success(response.data.message);
        dispatch(getCardList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getCardList = (token) => async (dispatch) => {
  try {
    dispatch(cardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/cards/get-cards`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllCards(response.data.data.cardsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getCardDetails = (token, card_id) => async (dispatch) => {
  try {
    dispatch(cardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/cards/card-details/${card_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(cardDetails(response.data.data.cardData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateCardRec = (token, card_id, data) => async (dispatch) => {
  try {
    dispatch(cardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/user/cards/card-update/${card_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateCard(response.data.message));
        dispatch(getCardList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteCardRec = (token, card_id) => async (dispatch) => {
  try {
    dispatch(cardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/cards/delete-card/${card_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteCard(response.data.message));
        dispatch(getCardList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
