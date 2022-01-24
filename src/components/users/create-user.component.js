import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import authService from "../../services/auth.service";

export default class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showContent: false
    };
  }

  componentDidMount() {

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_USER")) {
      
      this.setState({
        showContent: true
      });
    }else{
      this.setState({
        showContent: false
      });
    }

    /*
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
        
      }
    );
    */
  }

  render() {
    if(this.state.showContent){
      return (
        
        <div className="container">
          <header className="jumbotron">

            <h3>Hello </h3>
          </header>
        </div>
        
      );
    }else{
      return (
        
        <div className="container">
          <header className="jumbotron">

            <h3>Not Authorized to access this page</h3>
          </header>
        </div>
        
      );
    }
  }
}