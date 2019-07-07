import React from 'react';
import './css/App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

// Components
import AuthView from './components/AuthView/AuthView.jsx';
import HomeView from './components/HomeView/HomeView.jsx';
import LogoutBox from './components/LogoutBox.jsx';

require('dotenv').config();

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      logged: false,
      userId: ""
    }
  }


  componentWillMount = async () => {
    try{

      const loggedUserId = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/session`, {
        credentials: "include"
        });
      const loggedUserIdJSON = await loggedUserId.json();

      if (loggedUserIdJSON.data){

        this.setState({
          logged: true,
          userId: loggedUserIdJSON.data
          });

      }

    }catch(err){
      console.log(err)
    }
  }

  destroySession = () => {
    this.setState({
      logged: false,
      userId: ""
      });
  }

  render(){

    return (
      <Container fluid={true} className="App">

        <Switch>

          <Route exact path="/home" render={() => (
          this.state.logged ? (
            <Container className="AuthContainer">
              <LogoutBox destroySession={this.destroySession} />
              <HomeView userId={this.state.userId} />
            </Container>
            ) : (
              <Redirect to="/auth"/>
            )
          )}/>

          <Route exact path="/auth" render={() => (
          this.state.logged ? (
              <Redirect to="/home"/>
            ) : (
              <Container>
                <AuthView />
              </Container>
            )
          )}/>

          <Route exact path="/" render={() => (
          this.state.logged ? (
              <Redirect to="/home"/>
            ) : (
              <Redirect to="/auth"/>
            )
          )}/>

        </Switch>

      </Container>
    );
  }
}

export default App;
