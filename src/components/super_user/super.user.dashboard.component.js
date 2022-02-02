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

 class SuperUserDashboardComponent extends React.Component {

  constructor(props) {
     
    super(props);
   // this.onMenubarClick=this.onMenubarClick.bind(this);
    this.onBtnClick=this.onBtnClick.bind(this);
    this.state = {
        candidates: [
            {
                "organizationName":"Intello Group",
                "email":"jhon@intellogroup.com",
                "createdOn":"2019-03-09 13:00:02",
                "inacivatedOn":"2025-10-11 00:00:00",
                "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "organizationName":"KVM Group",
                "email":"stella@kvm.com",
                "createdOn":"2017-02-07 12:05:07",
                "inacivatedOn":"2030-08-21 00:00:00",
                "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "organizationName":"MGM",
                "email":"Raja@MGM.com",
                "createdOn":"2018-08-02 12:01:09",
                "inacivatedOn":"2018-04-06 00:00:00",
                "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            }
        ]
    };
   
     
  }//end of constructor
  componentDidMount() {
    
}
onBtnClick(email){
alert("candidate email = "+email);
}
  render() {

     return (
      <div> 
          <Panel header="Super User Dashboard page-- welcome Super User(here name must come)" >
                <div className="card">
                    <DataTable value={this.state.candidates} responsiveLayout="scroll">
                        
                        <Column field="organizationName" header="Organization Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="createdOn" header="Created On "></Column>
                        <Column field="inacivatedOn" header="Inactivated On"></Column>
                        <Column  body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-user-edit" />} header="Edit"></Column>
                        <Column body={<Button  className="p-button-raised p-button-rounded" icon="pi pi-check" />} header="Is Active"></Column>
                    </DataTable>
                </div>
            </Panel>
     </div>
    );
  }
}

export default withRouter(SuperUserDashboardComponent);


