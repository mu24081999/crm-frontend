import React, { useEffect, useContext, useState } from "react";
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
// import Dialer from "../../components/PhoneDialer/Dialer";
const Layout = ({ component }) => {
  const { notificationsArray } = useContext(SocketContext);
  const { notifications } = useSelector((state) => state.notification);
  const [notificationsData, setNotificationsData] = useState([]);
  const { isAuthenticated, token, accountSid, accountAuthToken, user } =
    useSelector((state) => state.auth);
  const { isLoading, subAccounts } = useSelector((state) => state.calling);
  const { users } = useSelector((state) => state.user);

  const redirectTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSubAccountsList(token));
    dispatch(getUsers(token));
    dispatch(getUserNotificationsList(token, user.id));
  }, [token, dispatch, user]);
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
      <ChatPopup />
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
