import React from 'react';
import { Menubar } from 'primereact/menubar';
import {history} from 'history';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import AuthVerify from "./common/auth-verify";
import CandidateBasicInfoComponent from './components/candidates/candidate.basiInfo.component';
import CandidateEducationComponent from './components/candidates/candidate.education.component';
import CandidateDocumentUploadComponent from './components/candidates/candidate.documentUpload.component ';
import CandidateExperienceComponent from './components/candidates/candidate.experience.component ';
import CandidateReferralComponent from './components/candidates/candidate.referrals.component ';
import CandidateViewComponent from './components/candidates/candidate.view.component';
import UserViewComponent from './components/users/user.view.component';
import UserCreateComponent from './components/users/user.create.component';
import SuperUserDashboardComponent from './components/super_user/super.user.dashboard.component';
import CreateOrgComponent from './components/super_user/create.org.component';
import EditOrgComponent from './components/super_user/edit.org.component';
import ManageDocComponent from './components/super_user/manage.document.type.component';
import ManageRolesComponent from './components/users/manage.roles.component';
import viewOrgComponent from "./components/super_user/view.org.component";
import assignRolesComponent from "./components/users/assign.roles.component";

import CreateUserComponent from "./components/users/create-user.component";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import ResetPwd from './components/resetPwd.component';
import userService from './services/user.service';

 class MenuContainerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    
    this.state = {
      currentUser: undefined,
      showCreateUser : false, // new added
      items : [
            {
                label: 'Home',
                icon: 'pi pi-home',
                url:'/home' // this
            }
        ]
    };

    

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
        /*{
            label: 'Sign Up',
            icon: 'pi pi-fw pi-power-off',
            url:'/register'
           
        },*/
        {
            label: 'Login',
            icon: 'pi pi-fw pi-power-off',
            url:'/login'
           
        }
    ]
    });
  }

  onMenubarClick = (path) => {
    alert(path);
    this.props.history.push({
      pathname:path,
      state: null
    });
}

clearHistory(){
  window.history.replaceState(null, '')
}


openProfile(){

  const user = AuthService.getCurrentUser();

  userService.findByUserId(user.userId).then((response) => {
    this.props.history.push({
      pathname: "/basicInfoEntry",
      state: response.data.output
    });
  });
}

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {

        // logic for Menu 
        let menus = this.state.items;
        
        if(user.permissions.includes("CANDIDATE_ENTRY")){
          menus.push(
          {
            label: 'My Profile',
            icon: 'pi pi-search-plus',
            //url:'/basicInfoEntry',
            command:()=>{ this.openProfile()}
          }
          );
        }
        
          menus.push(
          {
            label: 'Manage Organization',
            icon: 'pi pi-user',
            items: []
          },
          {
            label: 'Manage User',
            icon: 'pi pi-user',
            items: []
          },
          {
            label: 'Manage Candidate',
            icon: 'pi pi-user',
            /* command:()=>{this.onMenubarClick('/CandidateDocumentUploadComponent')}, */
            items: []
    
          }, 
          {
            label: 'About Us',
            icon: 'pi pi-search-plus',
            url:'/'
          },
          {
            label: 'Settings',
            icon: 'pi pi-key',
            items: []
          },
          {
            label: 'LogOut',
            icon: 'pi pi-fw pi-power-off',
            url:'/login',
            command:()=>{ this.logOut()}
          }
        );
        


        if(user.permissions.includes("CREATE_ORG")){

          for(let i = 0; i < menus.length; i++) {
            if(menus[i].label == 'Manage Organization'){
              menus[i].items.push({label: 'Create Organization', icon: 'pi pi-briefcase' ,url:'/createOrg'});
            }
          }
       }

       if(user.permissions.includes("VIEW_ORG")){

        for(let i = 0; i < menus.length; i++) {
          if(menus[i].label == 'Manage Organization'){
            menus[i].items.push({label: 'View Organization', icon: 'pi pi-briefcase' ,url:'/viewOrg'});
          }
        }
    }

      if(user.permissions.includes("EDIT_ORG")){
        for(let i = 0; i < menus.length; i++) {
          if(menus[i].label == 'Settings'){
            menus[i].items.push({label: 'Edit Profile', icon: 'pi  pi-user-edit' ,url:'/editOrg'});
          }
        }
    }

    if(user.permissions.includes("MANAGE_DOC")){
      for(let i = 0; i < menus.length; i++) {
        if(menus[i].label == 'Settings'){
          menus[i].items.push({label: 'Doc Type', icon: 'pi pi-database',  url:'/manageDoc'});
        }
      }
  }
  if(user.permissions.includes("MANAGE_ROLE")){
    for(let i = 0; i < menus.length; i++) {
      if(menus[i].label == 'Settings'){
        menus[i].items.push({label: 'Role Manage', icon: 'pi pi-check-circle',  url:'/manageRoles'});
      }
    }
}

if(user.permissions.includes("CREATE_USER")){
  for(let i = 0; i < menus.length; i++) {
    if(menus[i].label == 'Manage User'){
      menus[i].items.push({label: 'Create User', icon: 'pi pi-user-plus', url:'/createNewUser'});
    }
  }
}

if(user.permissions.includes("VIEW_USER")){
  for(let i = 0; i < menus.length; i++) {
    if(menus[i].label == 'Manage User'){
      menus[i].items.push({label: 'View User', icon: 'pi pi-user',url:'/viewUser'});
    }
  }
}

if(user.permissions.includes("VIEW_CANDIDATE")){
  for(let i = 0; i < menus.length; i++) {
    if(menus[i].label == 'Manage Candidate'){
      menus[i].items.push({label: 'View Candidate', icon: 'pi  pi-search-plus',url:'/viewCandidate'});
    }
  }
}

if(user.permissions.includes("CREATE_CANDIDATE")){
  for(let i = 0; i < menus.length; i++) {
    if(menus[i].label == 'Manage Candidate'){
      menus[i].items.push({label: 'Create Candidate', icon: 'pi pi-user-plus',url:'/basicInfoEntry',command:()=>{ this.clearHistory()}});
    }
  }
}


for(let i = 0; i < menus.length; i++) {

  if(menus[i].label == 'Manage Organization'){
    if(menus[i].items.length == 0){
      menus.splice(i, 1);
    }
  }

  if(menus[i].label == 'Manage User'){
    if(menus[i].items.length == 0){
      menus.splice(i, 1);
    }
  }

  if(menus[i].label == 'Settings'){
    if(menus[i].items.length == 0){
      menus.splice(i, 1);
    }
  }

  if(menus[i].label == 'Manage Candidate'){
    if(menus[i].items.length == 0){
      menus.splice(i, 1);
    }
  }


}






        // logic for menu end
      this.setState({
        currentUser: user,
        showCreateUser: user.permissions.includes("CREATE_USER"), // new added
        items: menus
      });
    }else{
        let menus = this.state.items;
        menus.push(
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





  render() {
    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

     return (
        <div>
        <div className="card">
            <Menubar model={this.state.items} start={start} />
        </div>

        <div className="container mt-3">
        
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/resetPwd" component={ResetPwd} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/createUser" component={CreateUserComponent} />
            <Route exact path="/educationEntry" component={CandidateEducationComponent} />
            <Route exact path="/basicInfoEntry" component={CandidateBasicInfoComponent} />
            <Route exact path="/documentUpload" component={CandidateDocumentUploadComponent} />
            <Route exact path="/experienceEntry" component={CandidateExperienceComponent} />
            <Route exact path="/referralEntry" component={CandidateReferralComponent} />
            <Route exact path="/viewCandidate" component={CandidateViewComponent} />
            <Route exact path="/viewUser" component={UserViewComponent} />
            <Route exact path="/createNewUser" component={UserCreateComponent} />
            <Route exact path="/superUserDshboard" component={SuperUserDashboardComponent} />
            <Route exact path="/editOrg" component={EditOrgComponent} />
            <Route exact path="/manageDoc" component={ManageDocComponent} />
            <Route exact path="/manageRoles" component={ManageRolesComponent} />
            
            
            <Route exact path="/createOrg" component={CreateOrgComponent} />
            <Route exact path="/viewOrg" component={viewOrgComponent} />
            <Route exact path="/assignRole" component={assignRolesComponent} />
           
          
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
       
     
    );
  }
}

export default withRouter(MenuContainerComponent);


