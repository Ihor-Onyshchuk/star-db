import React, { Component } from "react";
import "./ItemDetails.scss";
import SwapiService from "../../services/SwapiService";
import Spiner from "../Spiner/Spiner";
import ErrorButton from "../ErrorButton/ErrorButton";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }
    this.setState({ loading: true });

    getData(itemId).then(item => {
      this.setState({
        item,
        image: getImageUrl(item),
        loading: false
      });
    });
  }

  render() {
    const { item, loading, image } = this.state;
    if (!item) {
      return <span>Select a item from the list</span>;
    }
    const records = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { item });
    });

    const content = !loading ? (
      <ItemView item={item} image={image} records={records} />
    ) : null;

    const spiner = loading ? <Spiner /> : null;

    return (
      <div className="item-details card">
        {spiner}
        {content}
      </div>
    );
  }
}

const ItemView = ({ item, image, records }) => {
  const { name } = item;
  return (
    <React.Fragment>
      <img className="item-image" src={image} alt="item" />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">{records}</ul>
        <ErrorButton className="error-button" />
      </div>
    </React.Fragment>
  );
};
