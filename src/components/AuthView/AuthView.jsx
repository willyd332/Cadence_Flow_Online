import React from 'react';
import '../../css/login.css'
import { Container, Row, Col, Button } from 'reactstrap';

class AuthView extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      conPassword: "",
      logError: "",
      login: true
    }

  }


  login = async () => {
    try{
      console.log(process.env.REACT_APP_BACKEND_URL)
    const user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: "post",
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password,
        id: ""
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
      });
      if (user){
        const userJSON = await user.json();
        if (userJSON.status == "500" || !userJSON.data){
          this.setState({logError: "User Not Found"});
        }else{
          window.location.reload();
        }
      } else {
        this.setState({logError: "User Not Found"});
      }
    }catch(err){
      console.log("Login Failed!!! " + err);
      throw err;
    }
  }


  register = async () => {

    try{
      let registeredUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: "post",
        body: JSON.stringify({
          username: this.state.username.toLowerCase(),
          password: this.state.password,
          id: ""
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
        });
        if (registeredUser){
          const registeredUserJSON = await registeredUser.json();
          if (registeredUserJSON.status == "500" || !registeredUserJSON.data){
            this.setState({logError: "User Already Exists"});
          } else {
            window.location.reload();
          }
        } else {
          this.setState({logError: "User Already Exists"});
        }
    }catch(err){
      console.log("Register Failed!!! " + err);
    }

  }



  render(){
    return (
      <div>
        {this.state.login ? (
          <Container>
            <form
              onSubmit={(e)=>{
                e.preventDefault();
                if (this.state.username.length > 0 && this.state.password.length > 0){
                  this.login();
                }
              }}>
              <div>
                <img
                  className="loginLogo"
                  src={"../../../public/images/wideVersion2.png"}></img>
              </div>
              <Container className="loginBox">

                <Row className="loginRow">
                  <div>
                    <p>{this.state.logError}</p>
                    <input
                      className="loginInput"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={(e)=>{this.setState({username:e.target.value});}}
                      type="text"
                    >
                    </input>
                  </div>
                </Row>
                <Row className="loginRow">
                  <div>
                    <input
                      className="loginInput"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e)=>{this.setState({password:e.target.value});}}
                      type="password"
                    >
                    </input>
                  </div>
                </Row>
                <Row className="loginRow">
                  <div>
                    <Button
                      outline
                      color="primary"
                      className="loginButton"
                    type="submit">
                      Login
                    </Button>
                  </div>
                </Row>
                <Row>
                  <p
                    className="authLink"
                    onClick={()=>{
                      this.setState({
                        login: false,
                        username: "",
                        password: "",
                        conPassword: "",
                        logError: ""
                      })}}
                  >Create A New Account?</p>
                </Row>
              </Container>
            </form>
          </Container>


        ) : (


          <Container>
            <form
              onSubmit={(e)=>{
                e.preventDefault();
                if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.conPassword){
                  this.register();
                }
              }}>
              <div>
                <img
                  className="loginLogo"
                  src={"../../../public/images/wideVersion2.png"}></img>
              </div>
              <Container className="loginBox">
                <Row className="loginRow">
                  <div>
                    <p>{this.state.logError}</p>
                    <input
                      className="loginInput"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={(e)=>{this.setState({username:e.target.value});}}
                      type="text"
                    >
                    </input>
                  </div>
                </Row>
                <Row className="loginRow">
                  <div>
                    <input
                      className="loginInput"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e)=>{this.setState({password:e.target.value});}}
                      type="password"
                    >
                    </input>
                  </div>
                </Row>
                <Row className="loginRow">
                  <div>
                    <input
                      className="loginInput"
                      placeholder="Confirm Password"
                      value={this.state.conPassword}
                      onChange={(e)=>{this.setState({conPassword:e.target.value});}}
                      type="password"
                    >
                    </input>
                  </div>
                </Row>
                <Row className="loginRow">
                  <div>
                    <Button
                      outline
                      color="primary"
                      className="loginButton"
                      type="submit"
                    >
                      Register
                    </Button>
                  </div>
                </Row>
                <Row>
                  <p
                    className="authLink"
                    onClick={()=>{this.setState({
                      login: true,
                      username: "",
                      password: "",
                      conPassword: "",
                      logError: ""
                    })}}
                  >Already Have An Account?</p>
                </Row>
              </Container>
            </form>
            </Container>
        )}
      </div>

    );
  }
}

export default AuthView;
