import React, {
  useEffect,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import ChatPopup from "../../components/ChatPopup/ChatPopup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import { getUserSubAccountsList } from "../../redux/services/calling";
import Loader from "../../components/Loader/Loader";
import { addUserRec, getUsers } from "../../redux/services/users";
import _ from "lodash";
import Ticket from "./Ticket";
import SubaccountForm from "./SubaccountForm";
import { getUserNotificationsList } from "../../redux/services/notification";
import { SocketContext } from "../../Context";
import { getTodosList } from "../../redux/services/todo";
import {
  getEventsList,
  updateEventRec,
} from "../../redux/services/calendar_event";
import moment from "moment";
// import Dialer from "../../components/PhoneDialer/Dialer";
const Layout = ({ component }) => {
  const { notificationsArray, pushNotification } = useContext(SocketContext);
  const { notifications } = useSelector((state) => state.notification);
  const { todos } = useSelector((state) => state.todo);
  const { events } = useSelector((state) => state.calendar_event);

  const [notificationsData, setNotificationsData] = useState([]);
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const { isLoading, subAccounts } = useSelector((state) => state.calling);

  const redirectTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSubAccountsList(token));
    dispatch(getUsers(token));
    dispatch(getUserNotificationsList(token, user.id));
    dispatch(getTodosList(token));
    dispatch(getEventsList(token));
  }, [token, dispatch, user]);
  function isEventToday(eventDate) {
    // Create a new Date object for the current date
    const today = new Date();

    // Get the year, month, and day of the current date
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    // Create a new Date object from the event date
    const event = new Date(eventDate);

    // Get the year, month, and day of the event date
    const eventYear = event.getFullYear();
    const eventMonth = event.getMonth();
    const eventDay = event.getDate();
    // Check if the event date matches the current date
    return (
      todayYear === eventYear &&
      todayMonth === eventMonth &&
      todayDay === eventDay
    );
  }
  function timeStringToTimestamp(timeString) {
    // Get today's date
    const today = new Date();

    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Set the hours, minutes, and seconds of today's date
    today.setHours(hours, minutes, seconds, 0);

    // Return the timestamp (milliseconds since the Unix epoch)
    return today.getTime();
  }
  function isWithinOneHour(eventEndTime) {
    // Create a new Date object for the current date and time
    const now = new Date();

    // Calculate the difference in time between the event and now in milliseconds
    // const eventTime = new Date(eventDate).getTime();
    const eventTime = timeStringToTimestamp(eventEndTime);
    const currentTime = now.getTime();
    console.log("🚀 ~ isWithinOneHour ~ currentTime:", currentTime);
    const timeDifference = eventTime - currentTime;

    // Check if the time difference is within one hour (3600000 milliseconds)
    return timeDifference > 0 && timeDifference <= 3600000 * 2;
  }

  function shouldNotify(eventDate, eventEndTime) {
    return isEventToday(eventDate) && isWithinOneHour(eventEndTime);
  }
  async function todosReminder(todos) {
    if (todos?.length > 0) {
      for (let i = 0; i < todos.length; i++) {
        const element = todos[i];
        const shouldNotifyNow = shouldNotify(
          element.start_date,
          element.start_time
        );
        if (shouldNotifyNow) {
          const notification = {
            user_id: user.id,
            notification: `Hey ${user.name}, this is a reminder for the task ${
              element.name
            } happening on ${moment(element.start_date).format(
              "DD MMM, YYYY"
            )} at ${element.start_time}. Don't miss out!
            `,
            type: "todo_added",
          };
          pushNotification(notification);
          for (let y = 0; y < element?.asign_to?.members?.length; y++) {
            const member = element?.asign_to?.members[y];
            const notification = {
              user_id: member.id,
              notification: `Hey ${
                member.name
              }, this is a reminder for the task ${
                element.name
              } happening on ${moment(element.start_date).format(
                "DD MMM, YYYY"
              )} at ${element.start_time}. Don't miss out!
              `,
              type: "todo_added",
            };
            pushNotification(notification);
          }
        }
      }
    }
  }

  async function eventsReminder(events) {
    if (events?.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const element = events[i];
        const shouldNotifyNow = shouldNotify(
          element.start_date,
          element.start_time
        );

        if (shouldNotifyNow && element.notified === 0) {
          switch (element.type) {
            case "event":
              for (let z = 0; z < element?.team_members?.members?.length; z++) {
                const member = element?.team_members?.members[z];
                const notification = {
                  user_id: member.id,
                  notification: `Hey ${
                    member.name
                  }, this is a reminder for the event ${
                    element.name
                  } happening on ${moment(element.start_date).format(
                    "DD MMM, YYYY"
                  )} at ${element.start_time}. Don't miss out!
                  `,
                  type: "reminder_added",
                };
                pushNotification(notification);
              }
              const notification = {
                user_id: user.id,
                notification: `Hey ${
                  user.name
                }, this is a reminder for the event ${
                  element.name
                } happening on ${moment(element.start_date).format(
                  "DD MMM, YYYY"
                )} at ${element.start_time}. Don't miss out!
                `,
                type: "reminder_added",
              };
              pushNotification(notification);
              await dispatch(
                updateEventRec(token, { notified: 1 }, element.id)
              );
              break;
            case "reminder":
              const notificationParam = {
                user_id: user.id,
                notification: `Hey ${
                  user.name
                }, this is a reminder for the event ${
                  element.name
                } happening on ${moment(element.start_date).format(
                  "DD MMM, YYYY"
                )} at ${element.start_time}. Don't miss out!
                `,
                type: "reminder_added",
              };
              pushNotification(notificationParam);
              await dispatch(
                updateEventRec(token, { notified: 1 }, element.id)
              );
              break;
            default:
              break;
          }
        }
      }
    }
  }
  async function checkAndCallOnceADay(todos) {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
    const lastCalledDate = localStorage.getItem("todosReminderLastCallDate");
    // if (lastCalledDate !== todayString) {
    await todosReminder(todos);
    localStorage.setItem("todosReminderLastCallDate", todayString);
    // } else {
    // console.log("Function has already been called today.");
    // }
  }
  async function checkAndCallOnceADayReminder(events) {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
    const lastCalledDate = localStorage.getItem("eventsReminderLastCallDate");
    // if (lastCalledDate !== todayString) {
    await eventsReminder(events);
    // localStorage.setItem("eventsReminderLastCallDate", todayString);
    // } else {
    // console.log("Function has already been called today.");
    // }
  }

  useEffect(() => {
    if (todos.length > 0) {
      checkAndCallOnceADay(todos);
    }
  }, [todos]);
  useEffect(() => {
    if (events.length > 0) {
      checkAndCallOnceADayReminder(events);
    }
  }, [events]);
  useEffect(() => {
    if (!isAuthenticated) {
      redirectTo("/sign-in");
    }
  }, [isAuthenticated, redirectTo]);
  useEffect(() => {
    setNotificationsData(notifications);
  }, [notifications]);
  useEffect(() => {
    setNotificationsData(notificationsArray);
  }, [notificationsArray]);
  return (
    <div
      class="hk-wrapper"
      id="main_div"
      data-layout="vertical"
      data-layout-style="collapsed"
      data-menu="light"
      data-footer="simple"
      data-hover="active"
    >
      <TopNavbar
        subAccounts={subAccounts}
        notificationsData={notificationsData}
      />
      <VerticalNavbar />
      <div id="hk_menu_backdrop" className="hk-menu-backdrop"></div>
      {/* <button
        type="button"
        class="btn btn-primary btn-rounded btn-block mb-4 show-compose-popup"
        id="show_compose_popup"
      >
        Compose email
      </button> */}
      {/* <ChatPopup /> */}
      {component}
      <div>
        {" "}
        <Ticket />
        <SubaccountForm />
      </div>
    </div>
  );
};

export default Layout;
