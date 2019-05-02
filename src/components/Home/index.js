import React from "react";
import Button from "@material-ui/core/Button";
import ButtonPics from "./ButtonPics";

import { withAuthorization } from '../Session';

const Home = () => (
  <div className="App">
    <h1>Busy Times</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <ButtonPics />
  </div>
);

const condition = authUser => !!authUser;

export default (Home);