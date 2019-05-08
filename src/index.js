import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {Router} from 'react-router-dom'
import store from "../src/store/index";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";


ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
