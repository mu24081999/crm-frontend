import React, { lazy, Suspense } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";fds
import { createBrowserRouter } from "react-router-dom";
import RoleAuthorization from "./RoleAuthorization";
import PermissionAuthorization from "./PermissionAuthorization";
import NotFound from "./views/NotFound/NotFound";
import Loader from "./components/Loader/Loader";

// import SignIn from "./views/Auth/SignIn";
// import Dashboard from "./views/Dashboard/Dashboard";
// import SignUp from "./views/Auth/SignUp";
// import ResetPassword from "./views/Auth/ResetPassword";
// import VerifyPassword from "./views/Auth/VerifyPassword";
// import ResetUserPassword from "./views/Auth/ResetUserPassword";
// import TwoFactorAuth from "./views/Auth/TwoFactorAuth";
// import Chat from "./views/Chat/Chat";
// import Contacts from "./views/Contacts/Contacts";
// import Test from "./views/Test/Test2";
// import ContactDetails from "./views/Contacts/components/ContactDetails";
// import Email from "./views/Email/Email";
// import Board from "./views/Board/Board";
// import Shop from "./views/Shop/Shop";
// import Todo from "./views/Todo/Todo";
// import Gallery from "./views/Gallery/Gallery";
// import FileManager from "./views/FileManager/FileManager";
// import Post from "./views/Posts/Post";
// import Calender from "./views/Calender/Calender";
// import EmailsBulk from "./views/EmailsBulk/Email";
// import Invoice from "./views/Invoice/Invoice";
// import ChatGroup from "./views/ChatGroup/Chat";
// import DirectChat from "./views/ChatPopup/Chat";
// import Recordings from "./views/Recordings/Recording";
// import Clients from "./views/Admin/Clients/Users";
// import Agent from "./views/Agents/Agents";
// import AdminAgent from "./views/Admin/Agents/Agents";
// import Message from "./views/Message/Mesasge";
// import MessageBulk from "./views/MessageBulk/MesasgeBulk";
// import Account from "./views/Account/Account";
// import Profile from "./views/Profile/Profile";
// import Payment from "./views/Payment/Payment";
// import Subscription from "./views/Subscription/Subscription";
// import AdminSubscription from "./views/Admin/Subscription/Subscription";
// import KYC from "./views/KYC/KYC";
// import AdminKYC from "./views/Admin/KYC/KYC";
// import Subaccounts from "./views/SubAccounts/Subaccounts";
// import AdminSubaccounts from "./views/Admin/Subaccounts/Subaccounts";
// import ActiveNumbers from "./views/ActiveNumbers/Numbers";
// import AdminActiveNumbers from "./views/Admin/ActiveNumbers/Numbers";
// import PlanSelection from "./views/PlanSelection/PlanSelection";
// import VerifyEmailOtp from "./views/Auth/verifyEmailOtp";
// import Permissions from "./views/Permissions/Permission";
// import Terms from "./views/Terms/Terms";
// import Balance from "./views/Balance/Balance";
// import AdminBalance from "./views/Admin/Balance/Balance";
// import CallHistory from "./views/CallHistory/CallHistory";
// import MessagesLogs from "./views/MessagesLogs/MessagesLogs";
// import PlanRateSetting from "./views/PlanRateSetting/PlanRate";
// import PhoneNumberRates from "./views/Admin/PhoneNumberRates/PhoneNumberRates";
// import KYCNeeded from "./views/KYCNeeded/KYCNeeded";
// import A2PRegistrationRequests from "./views/Admin/A2PRegistrationRequest/A2PRegistrationRequests";
const Dashboard = lazy(() => import("./views/Dashboard/Dashboard"));
const SignIn = lazy(() => import("./views/Auth/SignIn"));
const SignUp = lazy(() => import("./views/Auth/SignUp"));
const ResetPassword = lazy(() => import("./views/Auth/ResetPassword"));
const VerifyPassword = lazy(() => import("./views/Auth/VerifyPassword"));
const ResetUserPassword = lazy(() => import("./views/Auth/ResetUserPassword"));
const TwoFactorAuth = lazy(() => import("./views/Auth/TwoFactorAuth"));
const Chat = lazy(() => import("./views/Chat/Chat"));
const Contacts = lazy(() => import("./views/Contacts/Contacts"));
const Test = lazy(() => import("./views/Test/Test2"));
const ContactDetails = lazy(() =>
  import("./views/Contacts/components/ContactDetails")
);
const Email = lazy(() => import("./views/Email/Email"));
const Board = lazy(() => import("./views/Board/Board"));
const Shop = lazy(() => import("./views/Shop/Shop"));
const Todo = lazy(() => import("./views/Todo/Todo"));
const Gallery = lazy(() => import("./views/Gallery/Gallery"));
const FileManager = lazy(() => import("./views/FileManager/FileManager"));
const Post = lazy(() => import("./views/Posts/Post"));
const Calender = lazy(() => import("./views/Calender/Calender"));
const EmailsBulk = lazy(() => import("./views/EmailsBulk/Email"));
const Invoice = lazy(() => import("./views/Invoice/Invoice"));
const ChatGroup = lazy(() => import("./views/ChatGroup/Chat"));
const DirectChat = lazy(() => import("./views/ChatPopup/Chat"));
const Recordings = lazy(() => import("./views/Recordings/Recording"));
const Clients = lazy(() => import("./views/Admin/Clients/Users"));
const Agent = lazy(() => import("./views/Agents/Agents"));
const AdminAgent = lazy(() => import("./views/Admin/Agents/Agents"));
const Message = lazy(() => import("./views/Message/Mesasge"));
const MessageBulk = lazy(() => import("./views/MessageBulk/MesasgeBulk"));
const Account = lazy(() => import("./views/Account/Account"));
const Profile = lazy(() => import("./views/Profile/Profile"));
const Payment = lazy(() => import("./views/Payment/Payment"));
const Subscription = lazy(() => import("./views/Subscription/Subscription"));
const AdminSubscription = lazy(() =>
  import("./views/Admin/Subscription/Subscription")
);
const KYC = lazy(() => import("./views/KYC/KYC"));
const AdminKYC = lazy(() => import("./views/Admin/KYC/KYC"));
const Subaccounts = lazy(() => import("./views/SubAccounts/Subaccounts"));
const AdminSubaccounts = lazy(() =>
  import("./views/Admin/Subaccounts/Subaccounts")
);
const ActiveNumbers = lazy(() => import("./views/ActiveNumbers/Numbers"));
const AdminActiveNumbers = lazy(() =>
  import("./views/Admin/ActiveNumbers/Numbers")
);
const PlanSelection = lazy(() => import("./views/PlanSelection/PlanSelection"));
const VerifyEmailOtp = lazy(() => import("./views/Auth/verifyEmailOtp"));
const Permissions = lazy(() => import("./views/Permissions/Permission"));
const Terms = lazy(() => import("./views/Terms/Terms"));
const Balance = lazy(() => import("./views/Balance/Balance"));
const AdminBalance = lazy(() => import("./views/Admin/Balance/Balance"));
const CallHistory = lazy(() => import("./views/CallHistory/CallHistory"));
const MessagesLogs = lazy(() => import("./views/MessagesLogs/MessagesLogs"));
const PlanRateSetting = lazy(() => import("./views/PlanRateSetting/PlanRate"));
const PhoneNumberRates = lazy(() =>
  import("./views/Admin/PhoneNumberRates/PhoneNumberRates")
);
const KYCNeeded = lazy(() => import("./views/KYCNeeded/KYCNeeded"));
const A2PRegistrationRequests = lazy(() =>
  import("./views/Admin/A2PRegistrationRequest/A2PRegistrationRequests")
);

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

const router = (user, subscribed, is_approved, permissionDetails) => {
  const permissionMapping = {
    "/": "dashboard",
    "/emails": "email",
    "/messages": "sms",
    "/call": "call",
    "/todos": "todos",
    "/shop": "phone_numbers",
    "/chats": "chat",
    "/chat-group": "group_chat",
    "/projects-board": "leads_pipeline",
    "/contacts": "contacts",
    "/file-manager": "file_manager",
    "/agents": "agents",
    "/call-history": "call_recordings",
    "/calendar": "calendar",
    "/messages-logs": "sms_logs",
    "/nessages-bulk": "bulk_sms",
    "/bulk-emails": "bulk_emails",
    "/balance": "wallet",
  };
  // Function to check if the user has the required permissions for the path
  const hasPermissionForPath = (path) => {
    if (!permissionDetails || !path) return false;
    const permissionKey = permissionMapping[path];
    return permissionKey && permissionDetails[permissionKey] === 1;
  };
  return createBrowserRouter([
    {
      path: "/",
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user,
      //   permissionDetails,
      //   "/"
      // )(Dashboard),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user,
            permissionDetails,
            "/"
          )(Dashboard)}
        </Suspense>
      ),
      children: [],
    },
    {
      path: "/admin/plan-rates",
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user,
            permissionDetails
          )(PlanRateSetting)}
        </Suspense>
      ),
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(PlanRateSetting),
      exact: true,
      // element: <Dashboard />,
    },
    {
      path: "/test",
      element: (
        <Suspense fallback={<Loader />}>
          <Test />
        </Suspense>
      ),
    },
    // {
    //   path: "/auth/google/callback",
    //   element: <GoogleAuth />,
    // },
    {
      path: "/terms-conditions",
      // element: <Terms />,
      element: (
        <Suspense fallback={<Loader />}>
          <Terms />
        </Suspense>
      ),
    },
    {
      path: "/help-support",
      // element: <NotFound />,
      element: (
        <Suspense fallback={<Loader />}>
          <NotFound />
        </Suspense>
      ),
    },
    {
      path: "/agents",
      // element: <Agent />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Agent),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Agent)}
        </Suspense>
      ),
    },
    {
      path: "/balance",
      // element: <Agent />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Balance),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Balance)}
        </Suspense>
      ),
    },
    {
      path: "/messages",
      // element: <Message />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Message),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Message)}
        </Suspense>
      ),
    },
    {
      path: "/messages-logs",
      // element: <Message />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(MessagesLogs),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(MessagesLogs)}
        </Suspense>
      ),
    },
    {
      path: "/call-history",
      // element: <Message />,
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(CallHistory)}
        </Suspense>
      ),
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(CallHistory),
    },
    {
      path: "/messages-bulk",
      // element: <Message />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(MessageBulk),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(MessageBulk)}
        </Suspense>
      ),
    },
    {
      path: "/admin/clients",
      // element: <Users />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Clients),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Clients)}
        </Suspense>
      ),
    },
    {
      path: "/admin/a2p-registration-requests",
      // element: <Users />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(A2PRegistrationRequests),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(A2PRegistrationRequests)}
        </Suspense>
      ),
    },
    {
      path: "/client/balance",
      // element: <Users />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(AdminBalance),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(AdminBalance)}
        </Suspense>
      ),
    },
    {
      path: "/admin/subaccounts",
      // element: <Users />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(AdminSubaccounts),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(AdminSubaccounts)}
        </Suspense>
      ),
    },
    {
      path: "/admin/number-rates",
      // element: <Users />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(PhoneNumberRates),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(PhoneNumberRates)}
        </Suspense>
      ),
    },
    {
      path: "/admin/agents",
      // element: <Users />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(AdminAgent),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(AdminAgent)}
        </Suspense>
      ),
    },
    {
      path: "/recordings",
      // element: <Recordings />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Recordings),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Recordings)}
        </Suspense>
      ),
    },
    {
      path: "/direct-chat",
      // element: <DirectChat />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(DirectChat),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(DirectChat)}
        </Suspense>
      ),
    },
    {
      path: "/chat-group",
      // element: <ChatGroup />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(ChatGroup),
      eleemnt: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(ChatGroup)}
        </Suspense>
      ),
    },
    {
      path: "/bulk-emails",
      // element: <EmailsBulk />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(EmailsBulk),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(EmailsBulk)}
        </Suspense>
      ),
    },
    {
      path: "/calendar",
      // element: <Calender />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Calender),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Calender)}
        </Suspense>
      ),
    },
    {
      path: "/invoices",
      // element: <Invoice />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Invoice),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Invoice)}
        </Suspense>
      ),
    },
    {
      path: "/gallery",
      // element: <Gallery />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Gallery),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Gallery)}
        </Suspense>
      ),
    },
    {
      path: "/file-manager",
      // element: <FileManager />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(FileManager),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(FileManager)}
        </Suspense>
      ),
    },
    {
      path: "/todos",
      // element: <Todo />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Todo),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Todo)}
        </Suspense>
      ),
    },
    {
      path: "/posts",
      // element: <Post />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Post),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Post)}
        </Suspense>
      ),
    },
    {
      path: "/shop",
      // element: <Shop />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Shop),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Shop)}
        </Suspense>
      ),
    },
    {
      path: "/projects-board",
      // element: <Board />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Board),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Board)}
        </Suspense>
      ),
    },
    {
      path: "sign-in",
      // element: <SignIn />,
      element: (
        <Suspense fallback={<Loader />}>
          <SignIn />
        </Suspense>
      ),
    },
    {
      path: "/contacts",
      // element: <Contacts />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Contacts),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Contacts)}
        </Suspense>
      ),
    },
    {
      path: "kyc-form",
      // element: <KYC />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(KYC),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(KYC)}
        </Suspense>
      ),
    },
    {
      path: "/admin/kyc-forms",
      // element: <KYC />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(AdminKYC),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(AdminKYC)}
        </Suspense>
      ),
    },
    {
      path: "/subaccounts",
      // element: <Subaccounts />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(is_approved === 1 ? Subaccounts : KYCNeeded),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(is_approved === 1 ? Subaccounts : KYCNeeded)}
        </Suspense>
      ),
    },
    {
      path: "/permissions",
      // element: <Permissions />,
      element: (
        <Suspense fallback={<Loader />}>
          <Permissions />
        </Suspense>
      ),
    },
    {
      path: "/sign-up",
      // element: <SignUp />,
      element: (
        <Suspense fallback={<Loader />}>
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: "/reset-password",
      // element: <ResetPassword />,
      element: (
        <Suspense fallback={<Loader />}>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: "/reset-password-verification/:email",
      // element: <VerifyPassword />,
      element: (
        <Suspense fallback={<Loader />}>
          <VerifyPassword />
        </Suspense>
      ),
    },
    {
      path: "/two-fa-verification/:email",
      // element: <TwoFactorAuth />,
      element: (
        <Suspense fallback={<Loader />}>
          <TwoFactorAuth />
        </Suspense>
      ),
      exact: true,
    },
    {
      path: "/email-verification/:email",
      // element: <VerifyEmailOtp />,
      element: (
        <Suspense fallback={<Loader />}>
          <VerifyEmailOtp />
        </Suspense>
      ),
      exact: true,
    },
    {
      path: "/edit-contact/:contactId",
      // element: <ContactDetails />,
      element: (
        <Suspense fallback={<Loader />}>
          <ContactDetails />
        </Suspense>
      ),
    },
    {
      path: "/active-numbers",
      // element: <ActiveNumbers />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(ActiveNumbers),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(ActiveNumbers)}
        </Suspense>
      ),
    },
    {
      path: "/admin/active-numbers",
      // element: <ActiveNumbers />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(AdminActiveNumbers),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(AdminActiveNumbers)}
        </Suspense>
      ),
    },
    {
      path: "/reset_password/:email",
      // element: <ResetUserPassword />,
      element: (
        <Suspense fallback={<Loader />}>
          <ResetUserPassword />
        </Suspense>
      ),
    },
    {
      path: "/chats",
      // element: <Chat />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Chat),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Chat)}
        </Suspense>
      ),
    },
    {
      path: "/emails",
      // element: <Email />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Email),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Email)}
        </Suspense>
      ),
    },
    // {
    //   path: "/account-settings",
    //   element: <Account />,
    // },
    {
      path: "/subscriptions",
      // element: <Subscription />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Subscription),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Subscription)}
        </Suspense>
      ),
    },
    {
      path: "/admin/subscriptions",
      // element: <Subscription />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(AdminSubscription),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(AdminSubscription)}
        </Suspense>
      ),
    },
    {
      path: "/plan-selection",
      // element: <PlanSelection />,
      element: (
        <Suspense fallback={<Loader />}>
          <PlanSelection />
        </Suspense>
      ),
    },
    {
      path: "/account-settings",
      // element: <Profile />,
      // element: RoleAuthorization(
      //   roles.dashboard,
      //   user?.role,
      //   subscribed,
      //   user
      // )(Profile),
      element: (
        <Suspense fallback={<Loader />}>
          {RoleAuthorization(
            roles.dashboard,
            user?.role,
            subscribed,
            user
          )(Profile)}
        </Suspense>
      ),
    },
    {
      path: "/test-payment",
      // element: <Payment />,
      element: (
        <Suspense fallback={<Loader />}>
          <Payment />
        </Suspense>
      ),
    },
  ]);
};

export default router;
