import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import '../../css/home.css'
import '../../css/modal.css'

// Components
import SearchBar from './SearchBar.js';
import MainList from './MainList.jsx';
import ConnectionModal from './ConnectionView/ConnectionModal.js';
import ConnectionUrgency from './ConnectionUrgency.js'

class HomeView extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      connections: [],
      searchConnections: [],
      searching: false,
      blur: {

      }
    }
  }


  componentWillMount() {
    this.findConnections();
  }


  deleteItem = async (item) => {
    try {
      const deletedItem = await fetch(`${process.env.REACT_APP_BACKEND_URL}/connection/${item._id}`, {
        method: "delete",
        credentials: "include",
      });
      if (deletedItem) {
        const deletedItemJSON = await deletedItem.json();
        if (deletedItemJSON.data) {
          this.editConnections(deletedItemJSON.data, false, true)
        } else {
          console.log("failed to delete -- status:" + deletedItemJSON.status);
        }
      } else {
        console.log("failed to delete");
      }
    } catch (err) {
      console.log("failed to delete " + err);
    }
  }


  markAsContacted = async (item) => {

    const newContactDate = new Date().getTime();
    item.lastContacted = newContactDate;
    try {
      const updatedItem = await fetch(`${process.env.REACT_APP_BACKEND_URL}/connection/${item._id}`, {
        method: "put",
        credentials: "include",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (updatedItem) {
        const updatedItemJSON = await updatedItem.json();
        if (updatedItemJSON.data) {
          this.editConnections(updatedItemJSON.data);
        } else {
          console.log("failed to update -- status:" + updatedItemJSON.status);
        }
      } else {
        console.log("failed to update");
      }
    } catch (err) {
      console.log("failed to update " + err);
    }

  }


  editConnections = async (input, newCon = false, deleteCon = false) => {
    if (deleteCon) {
      const editedConnections = this.state.connections.filter((connection) => {
        if (connection._id != input._id) {
          return true;
        }
      });
      this.setState({
        connections: editedConnections
      });
    } else {

      const editedConnections = this.state.connections.map((connection) => {
        if (connection._id == input._id) {
          return input;
        } else {
          return connection;
        }
      });
      if (newCon) {
        editedConnections.push(input);
      }
      const sortedConnections = await this.sortData(editedConnections);
      this.setState({
        connections: sortedConnections
      });
    }
  }


  findConnections = async () => {
    try {
      const userData = this.props.userId;
      const allConnections = await fetch(`${process.env.REACT_APP_BACKEND_URL}/connection`, {
        credentials: "include"
      });
      if (allConnections) {
        const allConnectionsJSON = await allConnections.json();
        if (allConnectionsJSON.data) {
          const allUserConnections = allConnectionsJSON.data;
          const sortedConnections = await this.sortData(allUserConnections);
          this.setState({
            connections: sortedConnections
          });
        } else {
          console.log("couldnt find em! " + allConnectionsJSON.status);
        }
      } else {
        console.log("couldnt find em! --- !allConnections");
      }
    } catch (err) {
      console.log("couldnt find em! " + err);
    }
  }


  sortData = async (connections) => {

    // Adding daysSince to connections
    connections = connections.map((connection)=> {
      if (!connection.daysSince){
        const oneDay         = 1000*60*60*24;
        let lastDay          = connection.lastContacted;
        let today            = new Date().getTime();
        today                = parseInt(today);
        lastDay              = parseInt(lastDay);
        const daysSince      = Math.round((today-lastDay)/oneDay);
        connection.daysSince = daysSince;
      }
      return connection;
    });

    // Defining helpful variables
    const connectionsBeingSorted = [];
    let reds   = 0;
    let yellows   = 0;
    let greens = 0;

    // Insert into new array by color and urgency
    const insertByColorAndUrgency = (connection) => {
      if (connection.daysSince >= connection.urgency) {
          connectionsBeingSorted.unshift(connection);
          reds++
      } else if (connection.daysSince >= Math.floor(connection.urgency / 2)) {
        connectionsBeingSorted.splice(reds + yellows, 0, connection);
        yellows++;
      } else {
        connectionsBeingSorted.splice(reds + yellows + greens, 0, connection);
        greens++;
      }
    }

    // Actually calling the function
    connections.forEach((connection) => {
      insertByColorAndUrgency(connection);
    });

    // Organizing that by days since
      let loopFloor;
      let loopCeiling = 0;

      const sortByDaysSince = (color) => {
        let insertPoint;
        let loopFloor;
        let loopCeiling;
        let section;
        if (color == 1){
          loopFloor = 0;
          loopCeiling = reds;
          section = reds;
        } else if (color == 2){
          loopFloor = reds;
          loopCeiling = reds + yellows;
          section = yellows;
        } else {
          loopFloor = reds + yellows;
          loopCeiling = reds + yellows + greens;
          section = greens;
        }

        // Inserts each connection by daysSince
          if (section > 1) {
            let i = loopFloor + 1;
            while (i < loopCeiling) {
            let x = i;
              let temp;
              while (x > loopFloor && connectionsBeingSorted[x].daysSince > connectionsBeingSorted[x - 1].daysSince) {
                temp = connectionsBeingSorted[x - 1];
                connectionsBeingSorted[x - 1] = connectionsBeingSorted[x];
                connectionsBeingSorted[x] = temp;
                x--;
              }
              i++;
            }
          }
        }

    // Actually calling the function for each color
      for (let color = 1; color <= 3; color++){
          sortByDaysSince(color);
      }

    return connectionsBeingSorted;
  }


  searchForString = async (string) => {
    if (string.length > 0) {
      const filtered = [];
      this.state.connections.forEach((connection) => {
        if (string.length <= connection.name.length){
        for (let i = 0; i < string.length; i++) {
          if (string[i].toLowerCase() !== connection.name[i].toLowerCase()) {
            break
          } else if (i === string.length - 1) {
            filtered.push(connection);
          }
        }
      }
      });
      const sorted = await this.sortData(filtered);
      this.setState({
        searching: true,
        searchConnections: sorted,
      });
    } else {
      this.setState({
        searching: false,
        searchConnections: [],
      });

    }
  }


  createConnection = async () => {
    try{
    const newConnection = await fetch(`${process.env.REACT_APP_BACKEND_URL}/connection`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
      });
    if (newConnection){
    const newConnectionJSON = await newConnection.json();
    if (newConnectionJSON.data){
    this.editConnections(newConnectionJSON.data, true);
    //
    // this.props.navigation.navigate('ConnectionView', {
    //   connectionData: newConnectionJSON.data,
    //   editConnections: this.props.editConnections,
    //   deleteItem: this.props.deleteItem,
    //   markAsContacted: this.props.markAsContacted
    //   });

    } else {
      console.log("failed to create " + newConnectionJSON.status)
    }
    } else {
      console.log("failed to create ---- !newConnection")
    }
    }catch(err){
      console.log("Creation of entry failed " + err);
    }
  }


  openConnectionInfo = () => {



  }


  render(){


    // THESE WILL 100% GO INTO THE CONNECTION
    // ITEM COMPONENTS AT SOME POINT

    const connectionsItems = this.state.connections.map((connection) => {
      return(

        <ConnectionModal
          key={connection._id}
          connection={connection}
          editConnections={this.editConnections}
          connectionItem={
            <Row
              className="connectionRow"
            >
              <div className="connectionItemInfo connectionItemNameBox">
                <p className="connectionItemName">{connection.name}</p>
                <p className="connectionItemCompany">{connection.company}</p>
              </div>
              <div className="connectionItemInfo connectionItemInfoUrge">
                <ConnectionUrgency connection={connection} />
              </div>
              <div className="connectionItemInfo">
                <div className="connectionItemInfoButtonBox">
                  <button
                    className="listActionButton ConBut"
                    onClick={()=>{this.markAsContacted(connection)}}>
                    Contact
                  </button>
                </div>
                <div className="connectionItemInfoButtonBox">
                  <button
                    className="listActionButton DelBut"
                    onClick={()=>{this.deleteItem(connection)}}>
                    Delete
                  </button>
                </div>
              </div>

            </Row>
          }
        />


            );
          });

        const searchConnectionsItems = this.state.searchConnections.map((connection) => {
          return(

            <ConnectionModal
              key={connection._id}
              connection={connection}
              editConnections={this.editConnections}
              connectionItem={
                <Row
                  className="connectionRow"
                >
                  <div className="connectionItemInfo connectionItemNameBox">
                    <p className="connectionItemName">{connection.name}</p>
                    <p className="connectionItemCompany">{connection.company}</p>
                  </div>
                  <div className="connectionItemInfo connectionItemInfoUrge">
                    <ConnectionUrgency connection={connection} />
                  </div>
                  <div className="connectionItemInfo">
                    <div className="connectionItemInfoButtonBox">
                      <button
                        className="listActionButton ConBut"
                        onClick={()=>{this.markAsContacted(connection)}}>
                        Contact
                      </button>
                    </div>
                    <div className="connectionItemInfoButtonBox">
                      <button
                        className="listActionButton DelBut"
                        onClick={()=>{this.deleteItem(connection)}}>
                        Delete
                      </button>
                    </div>
                  </div>

                </Row>
              }
            />

      );
        });

    return (

      <Container className="homeContainer">
        <Row className="searchBarRow">
          <SearchBar
            searchForString={this.searchForString}
            searchConnections={this.state.searchConnections}
          />
        </Row>
        <Row className="createConnectionRow">
          <button
            className="createConnectionButton"
            onClick={this.createConnection}>
            Add Connection
          </button>
          </Row>
          <Row className="mainListRow">
          <MainList
            searching={this.state.searching}
            connectionsItems={connectionsItems}
            searchConnectionsItems={searchConnectionsItems}
          />
        </Row>
      </Container>

    );
  }
}

export default HomeView;
