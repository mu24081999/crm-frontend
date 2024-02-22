import { combineReducers } from "redux";
import authReducer from "./slices/auth";
import userReducer from "./slices/users";
import contactReducer from "./slices/contact";
import emailReducer from "./slices/email";
import boardReducer from "./slices/board";
import boardTeamReducer from "./slices/board_team";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  contact: contactReducer,
  email: emailReducer,
  board: boardReducer,
  board_team: boardTeamReducer,
});
