import React, { Component,useState } from "react";
//import { Switch , Route, Link,BrowserRouter as Router } from "react-router-dom";
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



import menucontainer from "./menucontainer";
import CandidateInfoComponent from './components/candidates/candidate.info.component';

import userService from "./services/user.service";
import authService from "./services/auth.service";
class App extends Component {

  constructor(props) {
    super(props);
    

  }

 

  componentDidMount() {
    userService.getUserBoard().then(
      response => {
        
      },
      error => {
        authService.logout();
        this.props.history.push("/login");
        window.location.reload();
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  

  
 




  render() {
    
    return (

      
      <Router>
      <Switch>
        <Route exact path="/candidateInfoReg/:link" component={CandidateInfoComponent} />
        <Route component={menucontainer}/>
      </Switch>
      </Router>

      
    );
  }
}

export default App;