import React, { Component } from "react";
import BeerButton from "./BeerButton";
import CoffeeButton from "./CoffeeButton";
import BurgersButton from "./BurgersButton";
import CocktailButton from "./CocktailButton";
import PizzaButton from "./PizzaButton";
import TacoButton from "./TacoButton";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom"
import { getCurrentPosition } from '../../store/position'
import { connect } from "react-redux"

class Home extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="Home-App">
        <h1 className="home-title">
          Pop'n Spots<span className="subtitle">City Guide</span>
        </h1>
        <div className="home-page">
          <BeerButton className="cardButton" />
          <CoffeeButton className="cardButton" />
          <BurgersButton className="cardButton" />
          <CocktailButton className="cardButton" />
          <PizzaButton className="cardButton" />
          <TacoButton className="cardButton" />
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const mapDispatchToProps = dispatch => ({
  fetchAllPlaces: () => dispatch(getCurrentPosition())

});

const mapStateToProps = state => ({

});

const homePage = compose(
  withFirebase,
  withRouter
)(Home);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homePage);
