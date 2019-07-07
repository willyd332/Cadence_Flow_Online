import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';

// Components
import AllConnectionInfo from './AllConnectionInfo.js';
import UrgencySelection from './UrgencySelection.js';


class ConnectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      _id: this.props.connection._id,
      tags: this.props.connection.tags,
      name: this.props.connection.name,
      company: this.props.connection.company,
      cellphone: this.props.connection.cellphone,
      workphone: this.props.connection.workphone,
      email: this.props.connection.email,
      address: this.props.connection.address,
      birthday: this.props.connection.birthday,
      notes: this.props.connection.notes,
      urgency: this.props.connection.urgency,
      lastContacted: this.props.connection.lastContacted,
      changed: false,
      daysSince: this.props.connection.daysSince
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = async () => {

    if (this.state.changed && this.state.modal){
    try{
      const updatedEntry = await fetch(`${process.env.REACT_APP_BACKEND_URL}/connection/${this.state._id}`, {
        method: "put",
        credentials: "include",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
        });
      if (updatedEntry) {
        const updatedEntryJSON = await updatedEntry.json();
        if (updatedEntryJSON.data){
          this.props.editConnections(updatedEntryJSON.data);
        } else {
          console.warn("server failed to send data " + updatedEntryJSON.status + " If you just deleted a connection then this is expected and will be fixed");
        }
      } else {
        console.log("Failed to recieve response");
      }
    }catch(err){
      console.log("failed to update entry " + err);
    }
  }

    this.setState(prevState => ({
      modal: !prevState.modal
    }));

  }

  setBigState = (e, name, urgency = false) => {
    if (!urgency){
    this.setState({
      [name]: e.target.value,
      changed: true
      });
    } else {
      this.setState({
        urgency: e,
        changed: true
        });
    }
  }


  render() {
    return (
      <div>

          <div
          onClick={(e)=>{
            if (e.target.localName != "button") {
              this.toggle()
            }
            }}
          >
          {this.props.connectionItem}
          </div>

          <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          >

              <div
              className='modalBackground'
              onClick={this.toggle}
              >
              </div>

              <div
              className="connectionModalBox"
              >

              <AllConnectionInfo
              connection={this.state}
              setBigState={this.setBigState}
              />

              <ModalFooter>

              <UrgencySelection
              connection={this.state}
              setBigState={this.setBigState}
               />

              </ModalFooter>

              </div>

          </Modal>

      </div>
    );
  }
}

export default ConnectionModal;
