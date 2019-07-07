import React, {Component} from 'react';
import { Button, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';


export default class AllConnectionInfo extends Component {
  constructor(props){
    super(props);

  }


  handleChange = (e, name) => {
  this.props.setBigState(e, name);
  }

  render() {
    return (
      <div>
      <ModalHeader
      toggle={this.toggle}>

      <div className="connectionInfoNameBox connectionInfoInputBox" >
      <input
      className="connectionInfoNameInput"
      value={this.props.connection.name}
      onChange={(e)=>{this.handleChange(e, "name")}} >
      </input>
      </div>

      </ModalHeader>
      <ModalBody>
      <Container>

<div className="connectionInfoInputBox">
        <p
        className="connectionInfoInputTitle"
        >cellphone</p>
        <input
        className="connectionInfoGeneralInput"
        value={this.props.connection.cellphone}
        onChange={(e)=>{this.handleChange(e, "cellphone")}} >
        </input>
</div>

    <div className="itemSeperator" />

<div className="connectionInfoInputBox">
        <p
        className="connectionInfoInputTitle"
        >workphone</p>
        <input
        className="connectionInfoGeneralInput"
        value={this.props.connection.workphone}
        onChange={(e)=>{this.handleChange(e, "workphone")}} >
        </input>
</div>

  <div className="itemSeperator" />

<div className="connectionInfoInputBox">
        <p
        className="connectionInfoInputTitle"
        >company</p>
        <input
        className="connectionInfoGeneralInput"
        value={this.props.connection.company}
        onChange={(e)=>{this.handleChange(e, "company")}} >
        </input>
</div>

  <div className="itemSeperator" />

<div className="connectionInfoInputBox">
        <p
        className="connectionInfoInputTitle"
        >email</p>
        <input
        className="connectionInfoGeneralInput"
        value={this.props.connection.email}
        onChange={(e)=>{this.handleChange(e, "email")}} >
        </input>
</div>

  <div className="itemSeperator" />

<div className="connectionInfoInputBox">
        <p
        className="connectionInfoInputTitle"
        >address</p>
        <input
        className="connectionInfoGeneralInput"
        value={this.props.connection.address}
        onChange={(e)=>{this.handleChange(e, "address")}} >
        </input>
</div>

  <div className="itemSeperator" />

<div className="connectionInfoInputBox">
        <p
        className="connectionInfoInputTitle"
        >birthday</p>
        <input
        className="connectionInfoGeneralInput"
        value={this.props.connection.birthday}
        onChange={(e)=>{this.handleChange(e, "birthday")}} >
        </input>
</div>

  <div className="itemSeperator" />

<div className="connectionInfoInputBox">
        <p
        className="connectionInfoInputTitle"
        >notes</p>
        <textarea
        className="connectionInfoGeneralInput connectionInfoNotesInput"
        value={this.props.connection.notes}
        onChange={(e)=>{this.handleChange(e, "notes")}} >
        </textarea>
</div>


      </Container>

      </ModalBody>
      </div>
    );
  }
}
