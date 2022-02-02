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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import authService from '../../services/auth.service';

 class ManageRolesComponent extends React.Component {

  constructor(props) {
    super(props);
  
   this.desiganationTypesChange = this.desiganationTypesChange.bind(this);
   this.save=this.save.bind(this);
   this.onRolesChange=this.onRolesChange.bind(this);
   //this.onCityChange = this.onCityChange.bind(this);
   this.state = {
    showContent: false,
    desiganationType: null,
    desiganationTypeValue:null,
    roles:[],
    cities: [],
  
        roleValues: [
            {
                "name":"Admin",
                "permissions":"createUser/editUser/deleteUser/manageRole/editOrganization",
               
                "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "name":"Reviewer",
                "permissions":"reviewCandidate/viewCandidate",
               
               
                "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "name":"User",
                "permissions":"createCandidate/deleteCandidate/editCandidate/viewCandidate",
               
               
                "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            }
        ]
    
    };
   
    this.desiganationTypes = [
      { name: 'HR',code: 'HR'},
      { name: 'Accountant',code: 'ACC' },
      { name: 'User',code: 'USER'},
      { name: 'Admin',code: 'ADMIN'},
      { name: 'Reviewer',code: 'reviewer'},
  ];
  
  }//end


  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("MANAGE_DOC")) {
      
      this.setState({
        showContent: true,
        desiganationType: null,
        desiganationTypeValue:null,
        roles:[],
        cities: [],
      
            roleValues: [
                {
                    "name":"Admin",
                    "permissions":"createUser/editUser/deleteUser/manageRole/editOrganization",
                   
                    "edit":'pi pi-user-plus',
                    "ac":'pi pi-user-plus'
                },
                {
                    "name":"Reviewer",
                    "permissions":"reviewCandidate/viewCandidate",
                   
                   
                    "edit":'pi pi-user-plus',
                    "ac":'pi pi-user-plus'
                },
                {
                    "name":"User",
                    "permissions":"createCandidate/deleteCandidate/editCandidate/viewCandidate",
                   
                   
                    "edit":'pi pi-user-plus',
                    "ac":'pi pi-user-plus'
                }
            ]
        
        });
    }else{
      this.setState({
        showContent: false,
        desiganationType: null,
        desiganationTypeValue:null,
        roles:[],
        cities: [],
        roleValues: []
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
  desiganationTypesChange(e) {
  
    this.setState({ 
        desiganationType: e.value,
        desiganationTypeValue:e.value.code
    });
   
}

save(){
    alert(this.state.roles);
   
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
       <Panel header="Manage Roles" >
        
        
        <div class="grid">
        
        <div class="col-11">
        <Panel header="Enter Details">
        <div class="card">
        <div class="field grid">
            <label for="roleName" class="col-12 mb-2 md:col-2 md:mb-0"> Role Name</label>
            <div class="col-12 md:col-10">
                <input id="roleName" type="text" value=" "class="inputfield w-full"></input>
            </div>
        </div>
        
        <div class="field grid">
            <label for="permissions" class="col-12 mb-2 md:col-2 md:mb-0">Permissions</label>
            <div class="col-12 md:col-10">
            <div class="grid">
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role1" name="role" value="CREATEUSER" onChange={this.onRolesChange} checked={this.state.roles.indexOf('CREATEUSER') !== -1} />
                   <label htmlFor="role1">Create user</label>
            </div>
            </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role2" name="role" value="EDITUSER" onChange={this.onRolesChange} checked={this.state.roles.indexOf('EDITUSER') !== -1} />
                   <label htmlFor="role2">Edit User</label>
             </div>
          </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role3" name="role" value="DELETEUSER" onChange={this.onRolesChange} checked={this.state.roles.indexOf('DELETEUSER') !== -1} />
                   <label htmlFor="role3">Delete user</label>
             </div>
          </div>
          <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role1" name="role" value="MANAGEROLE" onChange={this.onRolesChange} checked={this.state.roles.indexOf('MANAGEROLE') !== -1} />
                   <label htmlFor="role1">Manage Role</label>
            </div>
            </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role2" name="role" value="EDITORGANIZATION" onChange={this.onRolesChange} checked={this.state.roles.indexOf('EDITORGANIZATION') !== -1} />
                   <label htmlFor="role2">Edit Organization</label>
             </div>
          </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role3" name="role" value="CREATECANDIDATE" onChange={this.onRolesChange} checked={this.state.roles.indexOf('CREATECANDIDATE') !== -1} />
                   <label htmlFor="role3">Create Candidate</label>
             </div>
          </div>
          <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role1" name="role" value="VIEWCANDIDATE" onChange={this.onRolesChange} checked={this.state.roles.indexOf('VIEWCANDIDATE') !== -1} />
                   <label htmlFor="role1">View Candidate</label>
            </div>
            </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role2" name="role" value="REVIEWCANDIDATE" onChange={this.onRolesChange} checked={this.state.roles.indexOf('REVIEWCANDIDATE') !== -1} />
                   <label htmlFor="role2">Review Candidate</label>
             </div>
          </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role3" name="role" value="EDITCANDIDATE" onChange={this.onRolesChange} checked={this.state.roles.indexOf('EDITCANDIDATE') !== -1} />
                   <label htmlFor="role3">Edit Candidate</label>
             </div>
          </div>
          <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role1" name="role" value="DELETECANDIDATE" onChange={this.onRolesChange} checked={this.state.roles.indexOf('DELETECANDIDATE') !== -1} />
                   <label htmlFor="role1">Delete Candidate</label>
            </div>
            </div>  
           
         
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
    <div className="card">
                    <DataTable value={this.state.roleValues} responsiveLayout="scroll">
                        
                        <Column field="name" header="Name"></Column>
                        <Column field="permissions" header="Permissions"></Column>
                         <Column  body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-user-edit" />} header="Edit"></Column>
                        <Column body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-check" />} header="Is Active"></Column>
                    </DataTable>
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

export default withRouter(ManageRolesComponent);


