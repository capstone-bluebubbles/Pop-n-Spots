import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

const Navigation = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

class NavigationAuth extends React.Component {
  constructor() {
    super();
    this.state = { showMenu: false };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  showMenu() {
    // event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }
  render() {
    return (
      <div className="nav-flex">
        <ul className="topnav">
          <li className="App-link">
            <Link className="active" to={ROUTES.HOME}>
              <button className="nav-buttons">Home</button>
            </Link>
          </li>
          <li className="App-link">
            <Link to={ROUTES.LANDING}>
              <button className="nav-buttons">Map</button>
            </Link>
          </li>
          <li className="App-link">
            <Link to={ROUTES.ACCOUNT}>
              <button className="nav-buttons">POPS!</button>
            </Link>
          </li>
          <li className="App-link">
            <SignOutButton />
          </li>
        </ul>
        {/* Hamburger Drop Down Menue */}
        {/* <ul className="nav-flex-burger">
          <Link className="icon" onClick={this.showMenu}>
            <i className="fa fa-bars" />
          </Link>
          <div>
            {this.state.showMenu ? (
              <div className="menu">
                <li>
                  <Link to={ROUTES.LANDING}>Map</Link>
                </li>
                <li>
                  <Link to={ROUTES.ACCOUNT}>POPS!</Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </div>
            ) : null}
          </div>
        </ul> */}
      </div>
    );
  }
}

class NavigationNonAuth extends React.Component {
  constructor() {
    super();
    this.state = { showMenu: false };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  showMenu() {
    // event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }
  render() {
    return (
      <div className="nav-flex">
        <ul className="topnav">
          <li className="App-link">
            <Link className="active" to={ROUTES.HOME}>
              <button className="nav-buttons">Home</button>
            </Link>
          </li>
          <li className="App-link">
            <Link to={ROUTES.LANDING}>
              <button className="nav-buttons">Map</button>
            </Link>
          </li>
          <li className="App-link">
            <Link to={ROUTES.ACCOUNT}>
              <button className="nav-buttons">POPS!</button>
            </Link>
          </li>
          <li className="App-link">
            <SignOutButton />
          </li>
        </ul>
        {/* Hamburger Drop Down Menue */}
        {/* <ul className="nav-flex-burger">
          <Link className="icon" onClick={this.showMenu}>
            <i className="fa fa-bars" />
          </Link>
          <div>
            {this.state.showMenu ? (
              <div className="menu">
                <li>
                  <Link to={ROUTES.LANDING}>Map</Link>
                </li>
                <li>
                  <Link to={ROUTES.ACCOUNT}>POPS!</Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </div>
            ) : null}
          </div>
        </ul> */}
      </div>
    );
  }
}

export default Navigation;
