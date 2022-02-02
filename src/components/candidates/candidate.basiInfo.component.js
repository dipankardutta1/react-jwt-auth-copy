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

 class CandidateBasicInfoComponent extends React.Component {

  constructor(props) {
    super(props);
  
   this.jobTypesChange = this.jobTypesChange.bind(this);
   this.save=this.save.bind(this);
   this.handleDob=this.handleDob.bind(this);
   
   this.state = {
    showContent: false,
    jobType: null,
    jobTypeValue:null,
    dob:null
    };
   
    this.jobTypes = [
      { name: 'Full Time',code: 'FT'},
      { name: 'Part Time',code: 'PT' },
      { name: 'Hourly',code: 'hourly'}
  ];
     
  }//end

  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_CANDIDATE")) {
      
      this.setState({
        showContent: true,
        jobType: null,
        jobTypeValue:null,
        dob:null
        });
    }else{
      this.setState({
        showContent: false,
        jobType: null,
        jobTypeValue:null,
        dob:null
        });
    }

    
  }



  jobTypesChange(e) {
  
    this.setState({ 
        jobType: e.value,
        jobTypeValue:e.value.code
    });
   
}
save(){
    alert(this.state.jobTypeValue);
    alert(this.state.dob);
}
handleDob(e){
    this.setState({ 
        dob: new Date(e.value)
    });
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
        <label for="candidateName" class="col-12 mb-2 md:col-2 md:mb-0">Candidate Name</label>
        <div class="col-12 md:col-10">
            <input id="candidateName" type="text" value="somnath biswas"class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="candidateNumber" class="col-12 mb-2 md:col-2 md:mb-0">Candidate Number</label>
        <div class="col-12 md:col-10">
            <input id="candidateNumber" type="text" value="somnath biswas" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="email" class="col-12 mb-2 md:col-2 md:mb-0">Email</label>
        <div class="col-12 md:col-10">
            <input id="email" type="text" value="som@gmail" class="inputfield w-full"></input>
        </div>
    </div><div class="field grid">
        <label for="confirmEmail" class="col-12 mb-2 md:col-2 md:mb-0">Confirm Email</label>
        <div class="col-12 md:col-10">
            <input id="confirmEmail" type="text" value="som@gmail" class="inputfield w-full"></input>
        </div>
    </div><div class="field grid">
        <label for="dob" class="col-12 mb-2 md:col-2 md:mb-0">Date Of Birth</label>
        <div class="col-12 md:col-2">
        <Calendar value={this.dob} dateFormat="mm/dd/yy" onChange={this.handleDob}></Calendar>
  </div>
    </div><div class="field grid">
        <label for="jobId" class="col-12 mb-2 md:col-2 md:mb-0">Job Id</label>
        <div class="col-12 md:col-10">
            <input id="jobId" type="text" value="Java001" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="jobType" class="col-12 mb-2 md:col-2 md:mb-0">Job Type</label>
        <div class="col-12 md:col-2">
        <Dropdown value={this.state.jobType} options={this.jobTypes} onChange={this.jobTypesChange} optionLabel="name" placeholder="Job Type" />
        </div>
    </div>
    <div class="field grid">
        <div class="col-12 md:col-10 col-offset-6">
        <Button label="save & continue" icon="pi pi-user" onClick={this.save} className="p-button-raised p-button-rounded"/>
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

export default withRouter(CandidateBasicInfoComponent);


