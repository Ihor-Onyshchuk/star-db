import React, { Component } from "react";
import "./App.scss";
import Header from "../Header/Header";
import RandomPlanet from "../RandomPlanet/RandomPlanet";
import SwapiService from "../../services/SwapiService";
import DummySwapiService from "../../services/DummySwapiService";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import { SwapiServiceProvider } from "../SwapiServiceContext/SwapiServiceContext";

import PeoplePage from "../Pages/PeoplePage";
import PlanetsPage from "../Pages/PlanetsPage";
import StarshipsPage from "../Pages/StarshipsPage";

export default class App extends Component {
  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new service()
      };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
