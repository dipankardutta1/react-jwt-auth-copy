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

class CandidateDocumentUploadComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showContent: false
      };
    
  }

  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_CANDIDATE")) {
      
      this.setState({
        showContent: true
        });
    }else{
      this.setState({
        showContent: false
        });
    }

    
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
        <Panel header="Candidate Registration" >
        
    <div class="grid">
    <div class="col-3" >
    <SideMenuComponent></SideMenuComponent>
    </div>
    <div class="col-9">
    <Panel header="Candidate Information Entry">
    <div class="card">
    <div class="field grid">
        <label for="w4" class="col-12 mb-2 md:col-2 md:mb-0">W4</label>
        <div class="col-12 md:col-10">
        <FileUpload id="w4" name="w4" url="./upload" maxFileSize="1000000" />
        </div>
    </div>
    <div class="field grid">
        <label for="wAuth" class="col-12 mb-2 md:col-2 md:mb-0">Work Authorization</label>
        <div class="col-12 md:col-10">
        <FileUpload id="wAuth" name="wAuth" url="./upload" maxFileSize="1000000" />
        </div>
    </div>
    <div class="field grid">
        <label for="passport" class="col-12 mb-2 md:col-2 md:mb-0">Passport</label>
        <div class="col-12 md:col-10">
        <FileUpload id="passport" name="w4" url="./upload" maxFileSize="1000000" />
        </div>
    </div>
    <div class="field grid">
        <div class="col-12 md:col-10 col-offset-6">
        <Button label="save & continue" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
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

export default withRouter(CandidateDocumentUploadComponent);


