import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

// function myFunction() {
//   let x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += "responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

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
      <ul className="topnav">
        <li>
          <Link className="active" to={ROUTES.HOME}>
            HOME
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={ROUTES.LANDING}>
            Map
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>POPS!</Link>
        </li>
      </ul>
    );
  }
}

//HAMBURGER MENU
{
  /* <li>
<div className={this.state.open ? "open" : "closed"}>
  <Link to={""} className="icon" onClick={this.toggleOpen}>
    <i className="fa fa-bars" />
  </Link>
</div>
</li> */
}
export default Navigation;
