import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  combineReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
});

export default store;
