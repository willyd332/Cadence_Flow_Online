import React, {Component} from 'react';
import Slider from 'react-input-slider';

export default class UrgencySelection extends Component {
  constructor(props){
    super(props)

    this.state = {
      currSliderValue: this.props.connection.urgency,
    }
  }



  handleSlide = (e) => {
    this.setState({
      currSliderValue: e.y
      });
    this.props.setBigState(e.y, "urgency", true);
  }


  render() {

    return (

      <div
      className="urgencySliderBox"
      >

      <p
      className="connectionInfoInputTitle urgencyTitle"
      >urgency</p>

      <div
      className="sliderValueDisplayText"
      >
      {this.state.currSliderValue} Days
      </div>

      <Slider
      axis="y"
      y={this.state.currSliderValue}
      ymin={1}
      ymax={100}
      onChange={(e)=>{this.handleSlide(e)}}
      styles={sliderStyle}
      />

      </div>

    );
  }
}

const sliderStyle = {
  track: {
    backgroundColor: '#AACFD0',
    marginTop: "30%",
    height: "400px",
    width: "30px"
  },
  active: {
    backgroundColor: '#ecf0f1',
    border: "1px solid black"
  },
  thumb: {
    width: "30px",
    height: "30px",
    marginTop: "-20px",
  }
}
