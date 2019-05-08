// library imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { placesReducer } from "./places";
<<<<<<< HEAD
import { userReducer } from "./user";
=======
import { positionReducer } from "./position"
>>>>>>> ec793881c0f1568162f64fb5dda885febcc7e776

// store imports
//import userReducer from "../store/user";

const reducer = combineReducers({
<<<<<<< HEAD
  //user: userReducer,
  places: placesReducer
=======
  //user: userReducer
  position: positionReducer,
  places: placesReducer,
>>>>>>> ec793881c0f1568162f64fb5dda885febcc7e776
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
//export * from '/src/user'
