import React, { Component } from "react";
import PersonDetails from "../SwComponents/PersonDetails";
import { PersonList } from "../SwComponents/ItemLists";
import Row from "../Row/Row";
export default class PeoplePage extends Component {
  state = {
    selectedItem: null
  };

  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <Row
        left={<PersonList onItemSelected={this.onItemSelected} />}
        right={<PersonDetails itemId={selectedItem} />}
      />
    );
  }
}
