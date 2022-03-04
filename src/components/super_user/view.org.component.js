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
import authService from '../../services/auth.service';
import userService from '../../services/user.service';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToggleButton } from 'primereact/togglebutton';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

 class ViewOrgComponent extends React.Component {

  constructor(props) {
    super(props);

    
    this.state = {
      loading:false,
      showContent:false,
      users:[]
      };


  }//end


  componentDidMount() { 
    
    const user = authService.getCurrentUser();

    this.state = {
      loading:false,
      showContent:false,
      users:[]
      };


    if (user && user.permissions.includes("VIEW_ORG")) {
      
      this.setState({
        loading:true,
        showContent:true,
        users:[]
      });

      userService.findByParentUserIdAndUserType(user.userId).then((response) => {
        
        this.setState({
          showContent: true,
          loading : false,
          users: response.data.output
        });

        //alert(response);
      },
      error => {
        this.setState({
          showContent: false,
          loading : false,
          users: []
        });
      }
    );





    }

    
  }



  editRow(rowData) {
 
    return (<div>
      <Button
        type="button" icon="pi pi-user-edit" value="Edit"
        className="ui-button-success" onClick={() => this.editOrg(rowData.userId)}
      />
      
    </div>);
  }


  editOrg(userId){
    this.props.history.push("/createOrg");
    localStorage.setItem("userId", userId);
  }
  
  deleteRow(rowData) {
 
    return (<div>
      <ToggleButton checked={!rowData.isDeleted} 
      onChange={(e) =>  this.onToggleClick(e,rowData)} 
      onIcon="pi pi-check" offIcon="pi pi-times" />
    </div>);
  }
  
  onToggleClick(val,rowData){
    this.setState({
      loading : true
    });
  
    userService.toggleUserStatusByEmail(rowData.email).then((response) => {
      userService.findByParentUserIdAndUserType(authService.getCurrentUser().userId).then((resp) => {
        
        this.setState({
          showContent: true,
          loading : false,
          users: resp.data.output
        });

        //alert(response);
      },
      error => {
        this.setState({
          showContent: false,
          loading : false,
          users: []
        });
      });
    },
    error => {
        this.setState({
          showContent: false,
          loading : false,
          users: []
      });
    });
  
    
      
   
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
            <Panel header="View User" >
              <div className="card">
                  <DataTable value={this.state.users} 
                   responsiveLayout="scroll" paginator rows={2} rowsPerPageOptions={[2,4,6]}>
                      
                      <Column field="name" header="Name"></Column>
                      <Column field="email" header="Email"></Column>
                    
                      <Column  body={this.editRow.bind(this)}    header="Edit" hidden={!authService.getCurrentUser().permissions.includes("EDIT_ORG")}></Column>
                      <Column body={this.deleteRow.bind(this)} header="Is Active" hidden={!authService.getCurrentUser().permissions.includes("DELETE_ORG")}></Column>
                  </DataTable>
              </div>
          </Panel>
        </div>
  );
   }
}




}

export default withRouter(ViewOrgComponent);


