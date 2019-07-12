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
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <img
          className="homeLogo"
          src={"src/components/wideVersion2.png"}
          alt="Flow Connect Online"
        ></img>
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
