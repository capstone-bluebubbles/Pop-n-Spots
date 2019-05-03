import React from "react";
import BeerButton from "./BeerButton";
import CoffeeButton from "./CoffeeButton";
import BurgersButton from "./BurgersButton";
import CocktailButton from "./CocktailButton";
import PizzaButton from "./PizzaButton";
import TacoButton from "./TacoButton";
import { withAuthorization } from "../Session";

const Home = () => (
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

const condition = authUser => !!authUser;

export default Home;
