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
import { ToggleButton } from 'primereact/togglebutton';

 class AssignRolesComponent extends React.Component {

  constructor(props) {
    super(props);
  
  
   this.save=this.save.bind(this);
   this.onRoleChange=this.onRoleChange.bind(this);
   //this.onCityChange = this.onCityChange.bind(this);
   this.state = {
    loading:false,
    showContent: false,
    roleValues: [],
    selectedRoles : []
    };
   
    
  
  }//end



  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();
    let userSelected=localStorage.getItem('userSelected');

    
    if (user && user.permissions.includes("MANAGE_ROLE") && (userSelected)) {

      this.setState({
        loading:true,
        showContent: false,
        parentUserId : user.userId
      });

      // query to be chnaged left join with userId and userSelected
      authService.findRolesByparentUserId( user.userId).then(response => {
        
        authService.getRolesByUserId(userSelected).then(resp => {
          this.setState({
            loading:false,
            showContent: true,
            roleValues: response.data.obj,
            selectedRoles : resp.data.obj
           
          });
        });
        
      });
      
      
    }else{
      this.setState({
        showContent: false,
        loading:false,
        roleValues: [],
        selectedRoles : []
      });
    }

    
  }
  
   
  

save(){
    //alert( "Okk" + JSON.stringify(this.state));
    const user = authService.getCurrentUser();
  
    authService.manageRole(JSON.stringify(this.state)).then(response => {
          
      if (response.data.obj.roleId) {
        

        authService.findRolesByparentUserId( user.userId).then(resp => {
          
          this.setState({
            loading:false,
            showContent: true,
            roleValues: resp.data.obj
           
          });

          alert("Role Created/Updated");
        });



      }else{
        alert("Role Not Created");
      }
    }).catch(error => {
      alert("URole Not Created:Please try again!");
      //return null;
    });
 
}




onRoleChange = (e) => {
  let userSelected=localStorage.getItem('userSelected');
  let roles = [...this.state.selectedRoles];
  if (e.checked)
  roles.push(e.value);
  else
  roles.splice(roles.indexOf(e.value), 1);

  this.setState({  loading:true });

  let obj = {"userId":userSelected,"roles":roles};

  //alert(JSON.stringify(obj));
  authService.manageRoleForUser(JSON.stringify(obj)).then(response => {
    this.setState({  loading:false,selectedRoles: roles });
  });

  

}

selectRow(rowData) {
 if(rowData.activeFlag=='Y'){
  return (<div>
    <Checkbox  value={rowData.roleName}  onChange={this.onRoleChange}
    checked={this.state.selectedRoles.indexOf(rowData.roleName) !== -1} />
  </div>);
 }else{
  return (<div>
  </div>);
 }
  
}






onToggleClick(val,rowData){

  const user = authService.getCurrentUser();

  this.setState({
    loading : true
  });
  
  let obj = {"roleId":rowData.roleId,"activeFlag":rowData.activeFlag == 'Y'? 'N' : 'Y'};

  //alert(JSON.stringify(obj));

  authService.manageRole(JSON.stringify(obj)).then(response => {
          
    if (response.data.obj.roleId) {

      //alert("OKKK");
      
      authService.findRolesByparentUserId( user.userId).then(resp => {

        this.setState({
          loading:false,
          showContent: true,
          roleValues: resp.data.obj
         
        });
      });
      
    }
  }).catch(error => {
    alert("Error " + error);
    //return null;
  });; 
 
}


  render() {
    if(this.state.loading){
      return (
        <div>
          <h3>Loading, Please Wait ....</h3>
        </div>
        );
    }else if(!this.state.showContent){
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
       
        
          <div className="card">
              <DataTable value={this.state.roleValues} responsiveLayout="scroll">
                  <Column field="roleName" header="Role Name" ></Column>
                  <Column body={this.selectRow.bind(this)} header="Select Role"  ></Column>
              </DataTable>
          </div>
      
        </div>
    </div>
            </Panel>
      </div>
    );
     }
  }
}

export default withRouter(AssignRolesComponent);


