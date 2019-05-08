import React from "react";
import { connect } from "react-redux";
import PopCard from "../Account/PopCard";
import LockCard from "../Account/LockCard";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";
import { getCurrentPosition } from "../../store/position";

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
    //console.log(`THE OBJECT`, this.props);
    return (
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
