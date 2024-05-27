// authActions.js
import axios from "axios";
import {
  invalidRequest,
  notificationRequestLoading,
  getUserNotifications,
} from "../slices/notifications";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getUserNotificationsList =
  (token, user_id) => async (dispatch) => {
    try {
      dispatch(notificationRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/user/notifications/get-user-notifications/${user_id}`,
          config
        )
        .then((response) => {
          console.log("🚀 ~ user-notification:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getUserNotifications(response.data.data.notificationsData));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
