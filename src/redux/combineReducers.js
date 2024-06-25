import { combineReducers } from "redux";
import authReducer from "./slices/auth";
import userReducer from "./slices/users";
import contactReducer from "./slices/contact";
import emailReducer from "./slices/email";
import boardReducer from "./slices/board";
import boardTeamReducer from "./slices/board_team";
import taskReducer from "./slices/project-tasks";
import todoReducer from "./slices/todo";
import galleryReducer from "./slices/gallery";
import postReducer from "./slices/post";
import calenderEventReducer from "./slices/calendar_event";
import invoiceReducer from "./slices/invoice";
import callingReducer from "./slices/calling";
import messageReducer from "./slices/message";
import agentReducer from "./slices/agent";
import paymentReducer from "./slices/payment";
import cardReducer from "./slices/card";
import subscriptionReducer from "./slices/subscription";
import dashboardReducer from "./slices/dashboard";
import billingReducer from "./slices/billing";
import kycReducer from "./slices/kyc";
import ticketReducer from "./slices/ticket";
import balanceReducer from "./slices/balance";
import notificationReducer from "./slices/notifications";
import planRatesReducer from "./slices/plan-rates";
import pricingReducer from "./slices/pricing";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  agent: agentReducer,
  contact: contactReducer,
  email: emailReducer,
  board: boardReducer,
  board_team: boardTeamReducer,
  board_task: taskReducer,
  todo: todoReducer,
  gallery: galleryReducer,
  post: postReducer,
  calendar_event: calenderEventReducer,
  invoice: invoiceReducer,
  calling: callingReducer,
  message: messageReducer,
  payment: paymentReducer,
  card: cardReducer,
  subscription: subscriptionReducer,
  dashboard: dashboardReducer,
  billing: billingReducer,
  kyc: kycReducer,
  ticket: ticketReducer,
  balance: balanceReducer,
  notification: notificationReducer,
  plan_rate: planRatesReducer,
  pricing: pricingReducer,
});
