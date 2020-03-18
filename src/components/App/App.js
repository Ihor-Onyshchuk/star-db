import React, { Component } from "react";
import "./App.scss";
import Header from "../Header/Header";
import RandomPlanet from "../RandomPlanet/RandomPlanet";
import ItemDetails, { Record } from "../ItemDetails/ItemDetails";
import SwapiService from "../../services/SwapiService";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import Row from "../Row/Row";
import ItemList from "../ItemList/ItemList";
import {
  PersonList,
  PlanetList,
  StarshipList
} from "../SwComponents/ItemLists";

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from "../SwComponents/Details";

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          <PersonDetails itemId={11} />

          <PlanetDetails itemId={5} />

          <StarshipDetails itemId={9} />

          <PersonList onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </PersonList>
          <PlanetList onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </PlanetList>

          <StarshipList onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </StarshipList>
          {/* 
          <Row left={peopleList} right={starshipDetails} /> */}
        </div>
      </ErrorBoundry>
    );
  }
}
