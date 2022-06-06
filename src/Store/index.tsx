import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combineReducers from './combineReducers';

const initialState = {};
const middleware = [thunk];
const store = createStore(
  combineReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
let currentState = store.getState();
store.subscribe(() => {
  currentState = store.getState();
});

export default store;
