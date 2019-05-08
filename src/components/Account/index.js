import React from "react";
import PopCard from "../Account/PopCard";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";

const AccountPage = () => {
  return(
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <h2 style={{ textAlign: "center" }}>Pops</h2>
        <PopCard />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
)};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
