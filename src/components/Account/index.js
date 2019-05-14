import React from "react";
import { connect } from "react-redux";
import PopCard from "../Account/PopCard";
import LockCard from "../Account/LockCard";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";
import { getCurrentPosition } from "../../store/position";
import { fetchUser } from "../../store/user";

class AccountPageComponent extends React.Component {
  constructor(props) {
    super(props);
    // set the state
    this.state = {};
  }

  componentDidMount() {
    // the default position has a timestamp of zero
    // if (this.props.currentPosition.timestamp === 0) {
    //   this.props.currentDispatch(getCurrentPosition());
    // }
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="account-container">
            <h1 className="user-welcome">Welcome: {authUser.email}</h1>
            <h2 className="lock-title">Pops</h2>
            <h3 className="user-places-title">Your Popped Places</h3>
            <PopCard uID={authUser.uid} />
            <h2 className="lock-title">Locks</h2>
            <h3 className="user-places-title">Your Favorite Places</h3>
            <LockCard uID={authUser.uid} />
            <h3 className="password-userChange">Change Your Password</h3>
            <div className="change-password-title">
              <PasswordChangeForm />
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPosition: state.position.currentPosition,
    currentPlaces: state.position.currentPlaces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currentDispatch: dispatch
  };
};
const condition = authUser => !!authUser;

//export default withAuthorization(condition)(AccountPage);

const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageComponent);

export default withAuthorization(condition)(AccountPage);
