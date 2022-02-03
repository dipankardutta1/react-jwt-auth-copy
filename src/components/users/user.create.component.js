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
import SideMenuComponent from '../menu/SideMenu';
import { Checkbox } from 'primereact/checkbox';
import authService from '../../services/auth.service';

 class UserCreateComponent extends React.Component {

  constructor(props) {
    super(props);

   this.save=this.save.bind(this);
   this.onRolesChange=this.onRolesChange.bind(this);
   
   this.state = {
    showContent: false,
    desiganationType: null,
    roles:[],
    name:'',
    email:'',
    contactNumber:'',
    location:'',
    roleList :[]
   
    };
   
    this.desiganationTypes = ['HR','Accountant','User','Admin','Reviewer'];
      
  
  }//end


  componentDidMount() { // New Method added By Dipankar

    

   

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_USER")) {
      
      this.setState({
        showContent: true,
        desiganationType: null,
        roles:[],
        name:'',
        email:'',
        contactNumber:'',
        location:''
       
        });

        authService.getRoles().then((response) => {
            //alert(JSON.stringify(response.data));
            this.setState({roleList: response.data});
         },
         error => {
             
         }
       );


    }else{
      this.setState({
        showContent: false,
        desiganationType: null,
        roles:[],
        name:'',
        email:'',
        contactNumber:'',
        location:'',
        roleList:[]
        });
    }

    
  }


  
   onRolesChange = (e) => {
    let selectedRoles = [...this.state.roles];
    if (e.checked)
    selectedRoles.push(e.value);
    else
    selectedRoles.splice(selectedRoles.indexOf(e.value), 1);
    this.setState({ roles: selectedRoles });

}


save(){
    alert(JSON.stringify(this.state));
   
}
  render() {
    if(!this.state.showContent){
        return (
          <div>
            <h3>Not Authorized to access this page</h3>
          </div>
          );
      }else{     
     return (
      <div>
       <Panel header="Create User" >
        
        
        <div class="grid">
        
        <div class="col-11">
        <Panel header="Enter Details">
        <div class="card">
        <div class="field grid">
            <label for="name" class="col-12 mb-2 md:col-2 md:mb-0"> Name</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
            </div>
        </div>
        <div class="field grid">
            <label for="email" class="col-12 mb-2 md:col-2 md:mb-0">Email</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
            </div>
        </div>
        <div class="field grid">
            <label for="contactNumber" class="col-12 mb-2 md:col-2 md:mb-0">Contact Number</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.contactNumber} onChange={(e) => this.setState({contactNumber: e.target.value})} />
            </div>
        </div><div class="field grid">
            <label for="location" class="col-12 mb-2 md:col-2 md:mb-0">Location</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.location} onChange={(e) => this.setState({location: e.target.value})} />
            </div>
        </div>
        
        <div class="field grid">
            <label for="desiganation" class="col-12 mb-2 md:col-2 md:mb-0">Desiganation</label>
            <div class="col-12 md:col-2">
            <Dropdown id="desiganation" value={this.state.desiganationType} options={this.desiganationTypes} onChange={(e) => this.setState({desiganationType: e.target.value})} placeholder="Select Desiganation Type" />
            </div>
        </div>
        
        <div class="field grid">
            <label for="roles" class="col-12 mb-2 md:col-2 md:mb-0">Roles</label>
            <div class="col-12 md:col-10">
            <div class="grid">
            {this.state.roleList.map((object) => (    
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role1" name="role" value="{object}" onChange={this.onRolesChange} checked={this.state.roles.indexOf({object}) !== -1} />
                   <label htmlFor="role1">{object}</label>
            </div>
            </div>  
            ))}
            {/*}
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role2" name="role" value="User" onChange={this.onRolesChange} checked={this.state.roles.indexOf('User') !== -1} />
                   <label htmlFor="role2">User</label>
             </div>
            </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role3" name="role" value="Reviewer" onChange={this.onRolesChange} checked={this.state.roles.indexOf('Reviewer') !== -1} />
                   <label htmlFor="role3">Reviewer</label>
             </div>
          </div>
            {*/}
            </div>
           </div>
        </div>
        <div class="field grid">
            <div class="col-12 md:col-10 col-offset-6">
            <Button label="submit" icon="pi pi-user" onClick={this.save} className="p-button-raised p-button-rounded"/>
            &nbsp; &nbsp; 
            <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
           
            </div>
        </div>
        
    </div>
        </Panel>
        </div>
    </div>
            </Panel>
      </div>
    );
    }
  }
}

export default withRouter(UserCreateComponent);


