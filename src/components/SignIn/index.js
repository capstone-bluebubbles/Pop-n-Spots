import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div className="signin-container">
    <h1 className="sign-in-title">Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.props)
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form className="form-item" onSubmit={this.onSubmit}>
        <div>
          <input
            className="email"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address:"
          />
        </div>
        <div>
          <input
            className="pass"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password:"
          />
        </div>
        <div>
          <button className="submit" type="submit">
            Sign In
          </button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
