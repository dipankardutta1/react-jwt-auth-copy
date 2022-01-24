import React, { Component,useState } from "react";
import { Switch , Route, Link,BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

import CreateUserComponent from "./components/users/create-user.component";

import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

class App extends Component {


  

  constructor(props) {
    super(props);

    
   



    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      showCreateUser : false, // new added
      items : [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-power-off',
                url:'/home' // this
                
            }
        ]
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    //
    
    
    if (user) {

        // logic for Menu 
        let menus = this.state.items;
        if(user.permissions.includes("CREATE_USER")){
            menus.push({
                label: 'Create User',
                icon: 'pi pi-fw pi-power-off',
                url:'/createUser'
            });
        }

        
       
        if(user){
            menus.push({
                label: 'User',
                icon: 'pi pi-fw pi-power-off',
                url:'/user'
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-power-off',
                url:'/Profile'
            },
            {
                label: 'LogOut',
                icon: 'pi pi-fw pi-power-off',
                url:'/login',
                command:()=>{ this.logOut()}
            });
        }

       
        // logic for menu end
     
      this.setState({
        currentUser: user,
        showCreateUser: user.permissions.includes("CREATE_USER"), // new added
        items: menus
      });


    }else{
        let menus = this.state.items;
        menus.push({
            label: 'Sign Up',
            icon: 'pi pi-fw pi-power-off',
            url:'/register'
           
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-power-off',
            url:'/login'
           
        });

        this.setState({
            currentUser: undefined,
            showCreateUser: false, // new added
            items: menus
          });

    }

    EventBus.on("logout", () => {
      this.logOut();
    });


     


  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      showCreateUser:false, // new added
      items: [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-power-off',
            url:'/home'
        },
        {
            label: 'Sign Up',
            icon: 'pi pi-fw pi-power-off',
            url:'/register'
           
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-power-off',
            url:'/login'
           
        }
    ]
    });
  }

  render() {
    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return (
      <div>
        <div className="card">
            <Menubar model={this.state.items} start={start} />
        </div>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/createUser" component={CreateUserComponent} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;