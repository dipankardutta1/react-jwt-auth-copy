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
import authService from '../../services/auth.service';

import SideMenuComponent from '../menu/SideMenu';
class CandidateEducationComponent extends React.Component {

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
        <label for="universityName" class="col-12 mb-2 md:col-2 md:mb-0">University Name</label>
        <div class="col-12 md:col-10">
            <input id="universityName" type="text" value="University of Texus" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="degree" class="col-12 mb-2 md:col-2 md:mb-0">Degree</label>
        <div class="col-12 md:col-10">
            <input id="degree" type="text" value="somnath biswas" class="inputfield w-full"></input>
        </div>
    </div>
    
    <div class="field grid">
        <label for="startDate" class="col-12 mb-2 md:col-2 md:mb-0">Start Date</label>
        <div class="col-12 md:col-2">
        <Calendar id="startDate" dateFormat="mm/dd/yy" ></Calendar>
        </div>
  </div>
  <div class="field grid">
        <label for="endDate" class="col-12 mb-2 md:col-2 md:mb-0">End Date</label>
        <div class="col-12 md:col-2">
        <Calendar id="endDate" dateFormat="mm/dd/yy" ></Calendar>
  </div>
  </div>
    <div class="field grid">
        <label for="subjectOfDegree" class="col-12 mb-2 md:col-2 md:mb-0">Subject Of Degree</label>
        <div class="col-12 md:col-10">
            <input id="subjectOfDegree" type="text" value="Computer Science" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="comment" class="col-12 mb-2 md:col-2 md:mb-0">Comment</label>
        <div class="col-12 md:col-10">
            <input id="comment" type="text" value="Great " class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
       <div class="col-10 md:col-6 col-offset-7">
        <Button label="save & continue" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
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

export default withRouter(CandidateEducationComponent);


