import { combineReducers } from "redux";
import posts from "./postProfileReducer";
import users from "./allUsersReducers";

export default combineReducers({
  users,
  posts,
});
