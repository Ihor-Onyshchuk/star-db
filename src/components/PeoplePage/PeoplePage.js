import React, { Component } from "react";
import "./PeoplePage.scss";
import ItemList from "../ItemList/ItemList";
import SwapiService from "../../services/SwapiService";
import PersonDetails from "../ItemDetails/ItemDetails";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import Row from "../Row/Row";

export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: null
  };

  onPersonSelected = selectedPerson => {
    this.setState({
      selectedPerson
    });
  };
  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {i => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={personDetails} />;
  }
}
