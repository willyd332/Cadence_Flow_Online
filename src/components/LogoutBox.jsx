import React, {Component} from 'react';


export default class SearchBar extends Component {
  constructor(props){
    super(props);

  }

  logout = async () => {
    try{
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
      credentials: "include"
    });
      // const loggedOutJSON = await loggedOut.json();
      // if (loggedOutJSON.status == "200"){
        this.props.destroySession();
      // }
    }catch(err){
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <img
          className="homeLogo"
          src={"/images/wideVersion2.png"}></img>
        <div
          onClick={this.logout}
          className="LogoutBox"
        >
          logout
        </div>
      </div>
    );
  }
}
