import React, { Component } from "react";
import StarshipDetails from "../SwComponents/StarshipDetails";
import { StarshipList } from "../SwComponents/ItemLists";
import Row from "../Row/Row";

export default class StarshipsPage extends Component {
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
        left={<StarshipList onItemSelected={this.onItemSelected} />}
        right={<StarshipDetails itemId={selectedItem} />}
      />
    );
  }
}
