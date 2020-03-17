import React, { Component } from "react";
import "./App.scss";
import Header from "../Header/Header";
import RandomPlanet from "../RandomPlanet/RandomPlanet";
import ItemDetails, { Record } from "../ItemDetails/ItemDetails";
import SwapiService from "../../services/SwapiService";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import Row from "../Row/Row";
import ItemList from "../ItemList/ItemList";

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
    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getAllPeople,
      getAllPlanets
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );
    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          <ItemList getData={getAllPeople} onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </ItemList>
          <ItemList getData={getAllPlanets} onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </ItemList>
          {/* 
          <Row left={peopleList} right={starshipDetails} /> */}
        </div>
      </ErrorBoundry>
    );
  }
}
