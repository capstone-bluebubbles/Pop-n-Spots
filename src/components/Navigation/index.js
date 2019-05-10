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
          <li className="active">
            <Link className="active" to={ROUTES.HOME}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={ROUTES.LANDING}>Map</Link>
          </li>
          <li>
            <Link to={ROUTES.ACCOUNT}>POPS!</Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
        <ul className="nav-flex-burger">
          <Link
            to={"javascript:void(0)"}
            className="icon"
            onClick={this.toggleOpen}>
            <i className="fa fa-bars" />
          </Link>
          <div>
            <button onClick={this.showMenu}>Show menu</button>

            {this.state.showMenu ? (
              <div className="menu">
                <button> Menu item 1 </button>
                <button> Menu item 2 </button>
                <button> Menu item 3 </button>
              </div>
            ) : null}
          </div>
        </ul>
      </div>
    );
  }
}

//HAMBURGER MENU TAKEN OUT FOR NOW. -JH
{
  /* <div className={this.state.open ? "open" : "closed"}>

</div> */
}

class NavigationNonAuth extends React.Component {
  constructor() {
    super();
    this.state = { open: true };
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  toggleOpen() {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  }
  render() {
    return (
      <div className="nav-flex">
        <ul className="topnav">
          <li className="active">
            <Link className="active" to={ROUTES.HOME}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={ROUTES.LANDING}>Map</Link>
          </li>
          <li>
            <Link to={ROUTES.ACCOUNT}>POPS!</Link>
          </li>
        </ul>
        <ul className="nav-flex-burger">
          <Link
            to={"javascript:void(0)"}
            className="icon"
            onClick={this.toggleOpen}>
            <i className="fa fa-bars" />
          </Link>
        </ul>
      </div>
    );
  }
}

//HAMBURGER MENU
// this.setState(state => {
//   return {
//     open: !state.open
//   };
// });

/* <li>
<div className={this.state.open ? "open" : "closed"}>
  <Link to={""} className="icon" onClick={this.toggleOpen}>
    <i className="fa fa-bars" />
  </Link>
</div>
</li> */

export default Navigation;
