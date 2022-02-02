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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import authService from '../../services/auth.service';
import userService from '../../services/user.service';

 class UserViewComponent extends React.Component {

  constructor(props) {
     
    super(props);
   // this.onMenubarClick=this.onMenubarClick.bind(this);
    this.onBtnClick=this.onBtnClick.bind(this);
    this.state = {
        showContent: false,
        loading : false,
        candidates: []
    };
   
     
  }//end of constructor
  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("VIEW_USER")) {
      this.setState({
        showContent: true,
        loading : true,
        candidates: []
    });
      userService.getAllUsers().then((response) => {
            this.setState({
              showContent: true,
              loading : false,
              candidates: response
          });
        },
        error => {
            this.setState({
              showContent: false,
              loading : false,
              candidates: []
          });
        }
      );

      //alert(JSON.stringify(userDetails));
     
    }else{
      this.setState({
        showContent: false,
        loading : false,
        candidates: []
    });
    }

    
  }
onBtnClick(email){
alert("candidate email = "+email);
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
          <Panel header="View User" >
                <div className="card">
                    <DataTable value={this.state.candidates} responsiveLayout="scroll">
                        
                        
                        <Column field="email" header="Email"></Column>
                        
                        <Column  body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-user-edit" />} header="Edit"></Column>
                        <Column body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-check" />} header="Is Active"></Column>
                    </DataTable>
                </div>
            </Panel>
     </div>
    );
     }
  }
}

export default withRouter(UserViewComponent);


