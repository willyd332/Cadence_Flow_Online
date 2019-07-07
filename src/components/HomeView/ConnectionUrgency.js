import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';


export default class ConnectionUrgency extends Component {
  constructor(props){
    super(props);

    this.state = {
      color: "white"
    }

  }

  componentDidUpdate = async () => {
    await this.assignColors();
  }
  componentWillMount = async () => {
    await this.assignColors();
  }

  assignColors = async () => {

    const connection = this.props.connection

        if (connection.daysSince >= connection.urgency){
          if (this.state.color !== "#DE1738"){
          this.setState({
            color:"#DE1738"
            });
          }
        } else if (connection.daysSince >= Math.floor(connection.urgency / 2)){
          if (this.state.color !== "#FFC300"){
          this.setState({
            color:"#FFC300"
            });
          }
        } else {
          if (this.state.color !== "#3CBA54"){
          this.setState({
            color:"#3CBA54"
            });
          }
        }
  }

  render() {

    return (

        <div

        >
        <div
        className="urgencyIndicatorBox"
        style={{backgroundColor: this.state.color}}
        >

            <p
            className="urgencyIndicator"
            >
            {this.props.connection.daysSince}
            </p>
          </div>
        </div>

    );
  }
  }
