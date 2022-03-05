import React, { Component,useState } from "react";
//import { Switch , Route, Link,BrowserRouter as Router } from "react-router-dom";
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



import menucontainer from "./menucontainer";
import CandidateInfoComponent from './components/candidates/candidate.info.component';
class App extends Component {

  constructor(props) {
    super(props);
    

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