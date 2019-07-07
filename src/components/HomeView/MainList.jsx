import React, {Component} from 'react';
import { Container, Row, Col} from 'reactstrap';


export default class SearchBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container
        className="mainListContainer"
      >
        {this.props.searching ? (
          this.props.searchConnectionsItems
        ) : (
          this.props.connectionsItems
        )}
      </Container>
    );
  }
}
