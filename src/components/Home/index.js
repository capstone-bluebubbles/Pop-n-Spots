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
import { withRouter } from "react-router-dom";
import { placesReducer, fetchPlaces } from "../../store/places";
import { connect } from "react-redux";

const state = {};

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllPlaces();
  }

  render() {
    return (
      <div className="Home-App">
        <h1 className="App-title">
          Pop'n Spots<span className="subtitle">City Guide</span>
        </h1>
        <div className="card">
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
  fetchAllPlaces: () => dispatch(fetchPlaces())
});
const mapStateToProps = state => ({
  places: state.places
});

const homePage = compose(
  withFirebase,
  withRouter
)(Home);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homePage);
