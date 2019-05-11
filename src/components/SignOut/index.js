import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <Link type="button" onClick={firebase.doSignOut}>
    <button className="log-out-buttons">Log Out</button>
  </Link>
);

export default withFirebase(SignOutButton);
