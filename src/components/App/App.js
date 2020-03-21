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
import LoginPage from "../Pages/LoginPage";
import SecretPage from "../Pages/SecretPage";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import StarshipDetails from "../SwComponents/StarshipDetails";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
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
    const { isLoggedIn } = this.state;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />

              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to StarDB</h2>}
                  exact
                />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/starships" exact component={StarshipsPage} />
                <Route
                  path="/starships/:id"
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => (
                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                  )}
                />
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                />
                {/* <Redirect to="/" /> */}
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
