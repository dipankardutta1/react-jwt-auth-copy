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
import { RadioButton } from 'primereact/radiobutton';
import SideMenuComponent from '../menu/SideMenu';
import authService from '../../services/auth.service';

 class CandidateExperienceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onMenubarClick=this.onMenubarClick.bind(this);
    this.isCurrentOrg=this.isCurrentOrg.bind(this);
    this.save=this.save.bind(this);

    this.state = {
      currentOrg: null,
      showContent: false
      
  };
   
  }

  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_CANDIDATE")) {
      
      this.setState({
        currentOrg: null,
        showContent: true
        });
    }else{
      this.setState({
        currentOrg: null,
        showContent: false
        });
    }

    
  }


  onMenubarClick = (path) => {
    this.props.history.push(path);
}
isCurrentOrg(e){

  this.setState({ 
    currentOrg:e.value
});

}
save(){
  alert(this.state.currentOrg);
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
        <label for="organizationName" class="col-12 mb-2 md:col-2 md:mb-0">Organization Name</label>
        <div class="col-12 md:col-10">
            <input id="organizationName" type="text" value="Intello Group"class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="desiganation" class="col-12 mb-2 md:col-2 md:mb-0">Desiganation</label>
        <div class="col-12 md:col-10">
            <input id="desiganation" type="text" value="Java Developer" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="startDate" class="col-12 mb-2 md:col-2 md:mb-0">Start Date</label>
        <div class="col-12 md:col-2">
        <Calendar id="startDate" dateFormat="mm/dd/yy" ></Calendar>
       </div>
    </div>
    <div class="field grid">
        <label for="endDate" class="col-12 mb-2 md:col-2 md:mb-0">End Date / Present</label>
        <div class="col-12 md:col-2">
        <Calendar id="endDate" dateFormat="mm/dd/yy" ></Calendar>
        <RadioButton inputId="endDate" name="currentOrg" value="Yes" onChange={this.isCurrentOrg} checked={this.state.currentOrg === 'Yes'} />
        <RadioButton inputId="endDate" name="currentOrg" value="No" onChange={this.isCurrentOrg} checked={this.state.currentOrg === 'No'} />
   
       </div>
    </div>
    <div class="field grid">
        <label for="reportingTo" class="col-12 mb-2 md:col-2 md:mb-0">Reporting To</label>
        <div class="col-12 md:col-10">
            <input id="reportingTo" type="text" value="Java Developer" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="comment" class="col-12 mb-2 md:col-2 md:mb-0">Comment</label>
        <div class="col-12 md:col-10">
            <input id="comment" type="text" value="Java Developer" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <div class="col-10 md:col-6 col-offset-7">
        <Button label="save & continue"  onClick={this.save} icon="pi pi-user" className="p-button-raised p-button-rounded"/>
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

export default withRouter(CandidateExperienceComponent);


