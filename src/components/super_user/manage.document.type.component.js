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

 class ManageDocComponent extends React.Component {

  constructor(props) {
     
    super(props);
   // this.onMenubarClick=this.onMenubarClick.bind(this);
    this.save=this.save.bind(this);
    this.state = {
      showContent: false,
        candidates: [
            {
                "docName":"W4",
                "docSize":"4 KB",
                  "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "docName":"Passport",
                "docSize":"4 KB",
                 "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            },
            {
                "docName":"Work Authorization",
                "docSize":"4 KB",
                  "edit":'pi pi-user-plus',
                "ac":'pi pi-user-plus'
            }
        ]
    };
   
     
  }//end of constructor
  
  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("MANAGE_DOC")) {
      
      this.setState({
        showContent: true,
        candidates: [
          {
              "docName":"W4",
              "docSize":"4 KB",
                "edit":'pi pi-user-plus',
              "ac":'pi pi-user-plus'
          },
          {
              "docName":"Passport",
              "docSize":"4 KB",
               "edit":'pi pi-user-plus',
              "ac":'pi pi-user-plus'
          },
          {
              "docName":"Work Authorization",
              "docSize":"4 KB",
                "edit":'pi pi-user-plus',
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

save(){

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
          <Panel header="Manage Document Types" >
          <Panel header="Enter Details" >
          <div class="card">
            <div class="field grid">
                <label for="docType" class="col-12 mb-2 md:col-2 md:mb-0">Document Type Name</label>
                <div class="col-12 md:col-10">
                <input id="docType" type="text" class="inputfield w-full"></input>
               </div>
            </div>
            <div class="field grid">
                <label for="docSize" class="col-12 mb-2 md:col-2 md:mb-0">Document Type Max Size(KB)</label>
                <div class="col-12 md:col-10">
                <input id="docSize" type="text" value=""class="inputfield w-full"></input>
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
                <div className="card">
                    <DataTable value={this.state.candidates} responsiveLayout="scroll">
                        
                        <Column field="docName" header="Document Type Name"></Column>
                        <Column field="docSize" header="Document Type Max Size(KB)"></Column>
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

export default withRouter(ManageDocComponent);


