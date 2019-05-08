// library imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { placesReducer } from "./places";
import { userReducer } from "./user";
import { positionReducer } from "./position";

// store imports
//import userReducer from "../store/user";

const reducer = combineReducers({
  //user: userReducer,
  places: placesReducer,
  //user: userReducer
  position: positionReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
//export * from '/src/user'
