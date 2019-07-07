import React, {Component} from 'react';


export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchString: "",
    }
  }

  search = async (value) => {
    if (this.props.searchConnections.length === 0 && this.state.searchString.length !== 0 && value.length >= this.state.searchString.length){
    } else {
    await this.setState({
      searchString: value
      });
    this.props.searchForString(this.state.searchString);
    }
  }

  render() {
    return (
      <div className="searchBarInputBox">
        <input
        className="searchBarInput"
        placeholder="Search..."
        value={this.state.searchString}
        onChange={(e)=>{this.search(e.target.value)}}>
        </input>
      </div>
    );
  }
}
