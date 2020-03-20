import React from "react";
import PersonDetails from "../SwComponents/PersonDetails";
import { PersonList } from "../SwComponents/ItemLists";
import Row from "../Row/Row";
import { withRouter } from "react-router-dom";
const PeoplePage = ({ match, history }) => {
  const { id } = match.params;
  return (
    <Row
      left={<PersonList onItemSelected={id => history.push(id)} />}
      right={<PersonDetails itemId={id} />}
    />
  );
};

export default withRouter(PeoplePage);
