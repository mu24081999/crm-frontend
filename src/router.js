import React, { useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";fds
import { createBrowserRouter } from "react-router-dom";
import RoleAuthorization from "./RoleAuthorization";
import PermissionAuthorization from "./PermissionAuthorization";
import NotFound from "./views/NotFound/NotFound";

import SignIn from "./views/Auth/SignIn";
import Dashboard from "./views/Dashboard/Dashboard";
import SignUp from "./views/Auth/SignUp";
import ResetPassword from "./views/Auth/ResetPassword";
import VerifyPassword from "./views/Auth/VerifyPassword";
import ResetUserPassword from "./views/Auth/ResetUserPassword";
import Chat from "./views/Chat/Chat";
import Contacts from "./views/Contacts/Contacts";
import Test from "./views/Test/Test2";
import ContactDetails from "./views/Contacts/components/ContactDetails";
import Email from "./views/Email/Email";
import Board from "./views/Board/Board";
import Shop from "./views/Shop/Shop";
import Todo from "./views/Todo/Todo";
import Gallery from "./views/Gallery/Gallery";
import FileManager from "./views/FileManager/FileManager";
import Post from "./views/Posts/Post";
import Calender from "./views/Calender/Calender";
import EmailsBulk from "./views/EmailsBulk/Email";
import Invoice from "./views/Invoice/Invoice";
import ChatGroup from "./views/ChatGroup/Chat";
import DirectChat from "./views/ChatPopup/Chat";
import Recordings from "./views/Recordings/Recording";
import Clients from "./views/Admin/Clients/Users";
import Agent from "./views/Agents/Agents";
import AdminAgent from "./views/Admin/Agents/Agents";
import Message from "./views/Message/Mesasge";
import MessageBulk from "./views/MessageBulk/MesasgeBulk";
import Account from "./views/Account/Account";
import Profile from "./views/Profile/Profile";
import Payment from "./views/Payment/Payment";
import Subscription from "./views/Subscription/Subscription";
import KYC from "./views/KYC/KYC";
import Subaccounts from "./views/SubAccounts/Subaccounts";
import AdminSubaccounts from "./views/Admin/Subaccounts/Subaccounts";
import ActiveNumbers from "./views/ActiveNumbers/Numbers";
import PlanSelection from "./views/PlanSelection/PlanSelection";
import VerifyEmailOtp from "./views/Auth/verifyEmailOtp";
import Permissions from "./views/Permissions/Permission";

// Define allowed roles for each route
const roles = {
  dashboard: ["USER", "ADMIN", "SUPER_ADMIN", "AGENT"],
  adminPanel: ["admin"],
  userProfile: ["user", "admin"],
};
const permissions = {
  subaccounts: [
    "dashboard",
    "email",
    "sms",
    "call",
    "todos",
    "phone_numbers",
    "chat",
    "group_chat",
    "leads_pipeline",
    "contacts",
    "file_manager",
    "agents",
    "call_recordings",
    "blogs",
  ],
  users: ["dashboard", "invoices", "subscriptions", "active_numbers"],
  agents: [
    "dashboard",
    "email",
    "sms",
    "call",
    "todos",
    "phone_numbers",
    "chat",
    "group_chat",
    "leads_pipeline",
    "contacts",
    "file_manager",
    "agents",
    "call_recordings",
    "blogs",
  ],
};

const router = (user, subscribed) => {
  return createBrowserRouter([
    {
      path: "/",
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Dashboard),
      exact: true,
      // element: <Dashboard />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/terms-conditions",
      element: <NotFound />,
    },
    {
      path: "/help-support",
      element: <NotFound />,
    },
    {
      path: "/agents",
      // element: <Agent />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Agent),
    },
    {
      path: "/messages",
      // element: <Message />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Message),
    },
    {
      path: "/messages-bulk",
      // element: <Message />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(MessageBulk),
    },
    {
      path: "/admin/clients",
      // element: <Users />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Clients),
    },
    {
      path: "/admin/subaccounts",
      // element: <Users />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(AdminSubaccounts),
    },
    {
      path: "/admin/agents",
      // element: <Users />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(AdminAgent),
    },
    {
      path: "/recordings",
      // element: <Recordings />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Recordings),
    },
    {
      path: "/direct-chat",
      // element: <DirectChat />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(DirectChat),
    },
    {
      path: "/chat-group",
      // element: <ChatGroup />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(ChatGroup),
    },
    {
      path: "/bulk-emails",
      // element: <EmailsBulk />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(EmailsBulk),
    },
    {
      path: "/calendar",
      // element: <Calender />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Calender),
    },
    {
      path: "/invoices",
      // element: <Invoice />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Invoice),
    },
    {
      path: "/gallery",
      // element: <Gallery />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Gallery),
    },
    {
      path: "/file-manager",
      // element: <FileManager />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(FileManager),
    },
    {
      path: "/todos",
      // element: <Todo />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Todo),
    },
    {
      path: "/posts",
      // element: <Post />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Post),
    },
    {
      path: "/shop",
      // element: <Shop />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Shop),
    },
    {
      path: "/projects-board",
      // element: <Board />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Board),
    },
    {
      path: "sign-in",
      element: <SignIn />,
    },
    {
      path: "contacts",
      // element: <Contacts />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Contacts),
    },
    {
      path: "kyc-form",
      // element: <KYC />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(KYC),
    },
    {
      path: "subaccounts",
      // element: <Subaccounts />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Subaccounts),
    },
    {
      path: "permissions",
      element: <Permissions />,
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      path: "reset-password-verification/:email",
      element: <VerifyPassword />,
    },
    {
      path: "email-verification/:email",
      element: <VerifyEmailOtp />,
    },
    {
      path: "edit-contact/:contactId",
      element: <ContactDetails />,
    },
    {
      path: "active-numbers",
      // element: <ActiveNumbers />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(ActiveNumbers),
    },
    {
      path: "reset_password/:email",
      element: <ResetUserPassword />,
    },
    {
      path: "/chats",
      // element: <Chat />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Chat),
    },
    {
      path: "/emails",
      // element: <Email />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Email),
    },
    // {
    //   path: "/account-settings",
    //   element: <Account />,
    // },
    {
      path: "/subscriptions",
      // element: <Subscription />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Subscription),
    },
    {
      path: "/plan-selection",
      element: <PlanSelection />,
    },
    {
      path: "/account-settings",
      // element: <Profile />,
      element: RoleAuthorization(
        roles.dashboard,
        user?.role,
        subscribed,
        user
      )(Profile),
    },
    {
      path: "/test-payment",
      element: <Payment />,
    },
  ]);
};

export default router;
