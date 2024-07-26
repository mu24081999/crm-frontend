// authActions.js
import axios from "axios";
import {
  invalidRequest,
  subscriptionRequestLoading,
  subscriptionDetails,
  getSubscriptions,
  addSubscription,
  getUserSubscription,
} from "../slices/subscription";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getSubscriptionsList = (token) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/subscriptions/get-subscriptions`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getSubscriptions(response.data.data.subscriptionsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserSubscriptions = (token) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/subscriptions/get-user-subscriptions`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserSubscription(response.data.data.subscriptionsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addUserSubscription = (token, data) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .post(`${backendURL}/user/subscriptions/add-subscription`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addSubscription(response.data.message));
        dispatch(getUserSubscriptions(token));
        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateUserSubscription =
  (token, subscription_id, data) => async (dispatch) => {
    try {
      dispatch(subscriptionRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const is_added = await axios
        .put(
          `${backendURL}/user/subscriptions/update-subscription/${subscription_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(addSubscription(response.data.message));
          dispatch(getUserSubscriptions(token));
          return true;
        });
      return is_added;
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const getSubscriptionDetails =
  (token, subscription_id) => async (dispatch) => {
    try {
      dispatch(subscriptionRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/user/subscriptions/subscription-details/${subscription_id}`,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(subscriptionDetails(response.data.data.boardData));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
