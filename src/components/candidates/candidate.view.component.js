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

 class CandidateViewComponent extends React.Component {

  constructor(props) {
     
    super(props);
   // this.onMenubarClick=this.onMenubarClick.bind(this);
    this.onBtnClick=this.onBtnClick.bind(this);
    this.state = {
        showContent: false,
        candidates: [
            {
                "name":"Bruce wayne",
                "email":"bruce@intellogroup.com",
                "contact":"033-088-999",
                "dob":"02-04-1990",
                "rev":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "name":"Danieal ",
                "email":"dip@intellogroup.com",
                "contact":"033-056-876",
                "dob":"01-05-1992",
                "rev":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "name":"Manoj Kumar",
                "email":"mg@intellogroup.com",
                "contact":"033-985-674",
                "dob":"06-08-1983",
                "rev":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            }
        ]
    };
   
     
  }//end of constructor
  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("VIEW_CANDIDATE")) {
      
      this.setState({
        showContent: true,
        candidates: [
            {
                "name":"Bruce wayne",
                "email":"bruce@intellogroup.com",
                "contact":"033-088-999",
                "dob":"02-04-1990",
                "rev":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "name":"Danieal ",
                "email":"dip@intellogroup.com",
                "contact":"033-056-876",
                "dob":"01-05-1992",
                "rev":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "name":"Manoj Kumar",
                "email":"mg@intellogroup.com",
                "contact":"033-985-674",
                "dob":"06-08-1983",
                "rev":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            }
        ]
    });
    }else{
      this.setState({
        showContent: false,
        candidates: []
    });
    }

    
  }

onBtnClick(email){
alert("candidate email = "+email);
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
          <Panel header="View Candidate" >
                <div className="card">
                    <DataTable value={this.state.candidates} responsiveLayout="scroll">
                        
                        <Column field="name" header="Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="contact" header="Contact"></Column>
                        <Column field="dob" header="Date of Birth"></Column>
                        <Column  body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-user-edit" />} header="Review"></Column>
                        <Column body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-check" />} header="Is Active"></Column>
                    </DataTable>
                </div>
            </Panel>
     </div>
    );
     }
  }
}

export default withRouter(CandidateViewComponent);


