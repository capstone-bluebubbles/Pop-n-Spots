import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { fetchUser } from '../../store/user'
import { connect } from 'react-redux'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

class App extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount(){
    if (this.props.firebase.auth.currentUser!==null){
      await this.props.fetchUser(this.props.firebase.auth.currentUser.uid);
    }
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <Navigation props={this.props.user} />
        <hr />
        <div>
          <Route exact path={ROUTES.DEFAULT} component={HomePage} />
          <Route path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    );
  }
}

const mapState = state => ({
  user: state.user.user
})

const mapDispatch = dispatch => ({
  fetchUser: uID => dispatch(fetchUser(uID))
})

const app = withAuthentication(App)

export default connect (mapState, mapDispatch)(app);
