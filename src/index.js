import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/index";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
