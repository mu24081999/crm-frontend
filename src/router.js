import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";fds
import { createBrowserRouter } from "react-router-dom";

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
import Users from "./views/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/recordings",
    element: <Recordings />,
  },
  {
    path: "/direct-chat",
    element: <DirectChat />,
  },
  {
    path: "/chat-group",
    element: <ChatGroup />,
  },
  {
    path: "/bulk-emails",
    element: <EmailsBulk />,
  },
  {
    path: "/calendar",
    element: <Calender />,
  },
  {
    path: "/invoices",
    element: <Invoice />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/file-manager",
    element: <FileManager />,
  },
  {
    path: "/todos",
    element: <Todo />,
  },
  {
    path: "/posts",
    element: <Post />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/projects-board",
    element: <Board />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "contacts",
    element: <Contacts />,
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
    path: "edit-contact/:contactId",
    element: <ContactDetails />,
  },
  {
    path: "reset-password/:email",
    element: <ResetUserPassword />,
  },
  {
    path: "/chats",
    element: <Chat />,
  },
  {
    path: "/emails",
    element: <Email />,
  },
]);

export default router;
