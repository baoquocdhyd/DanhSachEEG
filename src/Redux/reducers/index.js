import hR from "./reducer_1.js";
import userReducer from "./user.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  hobby: hR,
  user: userReducer,
});

export default rootReducer;

