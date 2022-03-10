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
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import {toast} from 'react-toastify';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';

 class ManageRolesComponent extends React.Component {

  constructor(props) {
    super(props);
  
  
   this.save=this.save.bind(this);
   this.onPermissionsChange=this.onPermissionsChange.bind(this);
   this.onSubmit=this.onSubmit.bind(this);
  
   this.validate=this.validate.bind(this);
   this.isFormFieldValid=this.isFormFieldValid.bind(this);
   this.getFormErrorMessage=this.getFormErrorMessage.bind(this);
   this.state = {
    loading:false,
    showContent: false,
    permissions:[],
    roleValues: []
    };
   
    
  
  }//end
  validate = (data) => {
    let errors = {};
    if (!data.roleName) {
        errors.roleName = 'Role Name is required.';
    }
    return errors;
};

onSubmit = (data, form) => {
  if(form){
    
      this.setState({
        
        roleId:data.roleId,
        roleName:data.roleName
      },() => this.save());
  }
  
  
};

isFormFieldValid = (meta) => !!(meta.touched && meta.error);
getFormErrorMessage = (meta) => {
    return this.isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
};


  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();
    let userId=localStorage.getItem('userId');

    if (user && user.permissions.includes("MANAGE_ROLE") && !(userId)) {

      this.setState({
        loading:true,
        showContent: false,
        parentUserId : user.userId
      });

      authService.findRolesByparentUserId( user.userId).then(response => {

        this.setState({
          loading:false,
          showContent: true,
          roleValues: response.data.obj
         
        });
      });
      
      
    }else{
      this.setState({
        showContent: false,
        loading:false,
        permissions:[],
        roleValues: []
      });
    }

    
  }
  
   onPermissionsChange = (e) => {
    let selectedPermissions = [...this.state.permissions];
    if (e.checked)
    selectedPermissions.push(e.value);
    else
    selectedPermissions.splice(selectedPermissions.indexOf(e.value), 1);
    this.setState({ permissions: selectedPermissions });

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
            roleValues: resp.data.obj,
            roleId:response.data.obj.roleId
          });

          toast("Role Created/Updated");
        });



      }else{
        toast("Error:Please try again!");
      }
    }).catch(error => {
      alert("Error:Please try again!");
      //return null;
    });
 
}

editRole(rowData){
  //this.props.history.push("/manageRoles");
  //localStorage.setItem("userId", userId);
  this.setState(
    { roleId : rowData.roleId,
      roleName : rowData.roleName,
      permissions:rowData.permissions});
}
editRow(rowData) {
 
  return (<div>
    <Button
      type="button" icon="pi pi-user-edit" value="Edit"
      className="ui-button-success" onClick={() => this.editRole(rowData)}
    />
    
  </div>);
}


deleteRow(rowData) {
 
  return (<div>
    <ToggleButton checked={rowData.activeFlag == 'Y'? true : false} 
    onChange={(e) =>  this.onToggleClick(e,rowData)} 
    onIcon="pi pi-check" offIcon="pi pi-times" />
  </div>);
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
          <center><ProgressSpinner/></center>
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
        <Panel header="Enter Details">

        <Form onSubmit={this.onSubmit} initialValues={
          { roleId:this.state.roleId,
            roleName:this.state.roleName,
           }
          }
          validate={this.validate} render={({ handleSubmit,form ,submitting, pristine}) => (
          <form onSubmit={handleSubmit} className="p-fluid">

        <div class="card">
        <div class="field grid">
            <label for="roleName" class="col-12 mb-2 md:col-2 md:mb-0"> Role Name</label>
            <div class="col-12 md:col-10">
                <InputText  hidden value={this.state.roleId} onChange={(e) => this.setState({roleId: e.target.value})} />
                <Field name="roleName" render={({ input, meta }) => (
                      <div className="field">
                          <span className="p-float-label">
                              <InputText id="roleName" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                              <label htmlFor="roleName" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Role Name</label>
                          </span>
                          {this.getFormErrorMessage(meta)}
                      </div>
                )} />
            </div>
        </div>
        
        <div class="field grid">
            <label for="permissions" class="col-12 mb-2 md:col-2 md:mb-0">Permissions</label>
            <div class="col-12 md:col-10">
            <div class="grid">
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role1" name="role" value="CREATE_USER" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('CREATE_USER') !== -1} />
                   <label htmlFor="role1">Create user</label>
            </div>
            </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role2" name="role" value="EDIT_USER" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('EDIT_USER') !== -1} />
                   <label htmlFor="role2">Edit User</label>
             </div>
          </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role3" name="role" value="DELETE_USER" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('DELETE_USER') !== -1} />
                   <label htmlFor="role3">Inactivate user</label>
             </div>
          </div>
          <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role4" name="role" value="VIEW_USER" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('VIEW_USER') !== -1} />
                   <label htmlFor="role3">View user</label>
             </div>
          </div>
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role5" name="role" value="CREATE_CANDIDATE" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('CREATE_CANDIDATE') !== -1} />
                   <label htmlFor="role3">Create Candidate</label>
             </div>
          </div>
          <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role6" name="role" value="EDIT_CANDIDATE" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('EDIT_CANDIDATE') !== -1} />
                   <label htmlFor="role3">Edit Candidate</label>
             </div>
          </div>
          <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role7" name="role" value="VIEW_CANDIDATE" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('VIEW_CANDIDATE') !== -1} />
                   <label htmlFor="role1">View Candidate</label>
            </div>
            </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role8" name="role" value="REVIEW_CANDIDATE" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('REVIEW_CANDIDATE') !== -1} />
                   <label htmlFor="role2">Review Candidate</label>
             </div>
          </div>  
            
          <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role9" name="role" value="DELETE_CANDIDATE" onChange={this.onPermissionsChange} checked={this.state.permissions.indexOf('DELETE_CANDIDATE') !== -1} />
                   <label htmlFor="role1">Inactivate Candidate</label>
            </div>
            </div>  
           
         

            </div>
           </div>
        </div>
        <div class="field grid">
            <div class="col-3 md:col-3 col-offset-3">
            <Button label="submit" icon="pi pi-user" type='submit' className="p-button-raised p-button-rounded"/>
            &nbsp; &nbsp; 
            <Button label="Reset for New Entry" type="button"
                onClick={() => {
                this.props.history.push("/manageRoles");
                window.location.reload();
            }} icon="pi pi-user" className="p-button-raised p-button-rounded" />
           
            </div>
        </div>
        
    </div>
    </form>
    )}/>
    <div className="card">
                    <DataTable value={this.state.roleValues} responsiveLayout="scroll">
                        
                        <Column field="roleName" header="Role Name"></Column>
                        
                         <Column  body={this.editRow.bind(this)} header="Edit"></Column>
                        <Column body={this.deleteRow.bind(this)} header="Is Active"></Column>
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


