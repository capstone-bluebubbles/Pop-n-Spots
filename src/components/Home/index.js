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
import { fetchPlaces } from '../../store/places'
import {connect} from "react-redux"
import { messageRef } from "../Firebase/firebase"
//import { updateMessage } from "../../../functions/index"

class Home extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchAllPlaces();
  }

  handleClick(event){
    console.log(event)
    messageRef.update({'temp1': 'this home page update'})
  }  

  render() {
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
        <div>
            <button type='button' onClick={this.handleClick}>Click Me For Update</button>
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
