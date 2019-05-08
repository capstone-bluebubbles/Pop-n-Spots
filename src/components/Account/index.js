import React from "react";
import PopCard from "../Account/PopCard";
import LockCard from "../Account/LockCard";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <h2 className="lock-title">Pops</h2>
        <PopCard />
        <h2 className="lock-title">Locks/Favorites</h2>
        <LockCard />
        <h3 className="lock-title">Change Your Password</h3>
        <div className="lock-title">
          <PasswordChangeForm />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
