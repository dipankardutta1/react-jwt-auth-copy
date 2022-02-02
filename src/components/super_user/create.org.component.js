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

 class CreateOrgComponent extends React.Component {

  constructor(props) {
    super(props);
  
   this.industryTypesChange = this.industryTypesChange.bind(this);
   this.save=this.save.bind(this);
   this.handleValidity=this.handleValidity.bind(this);
   
   this.state = {
    industryType: null,
    industryTypeValue:null,
    validity:null,
    showContent: false //  new code By Dipankar
    };
   
    this.industryTypes = [
      { name: 'IT',code: 'IT'},
      { name: 'SOftware',code: 'Software' }
      
  ];
     
  }//end


  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_ORG")) {
      
      this.setState({
        industryType: null,
        industryTypeValue:null,
        validity:null,
        showContent: true
      });
    }else{
      this.setState({
        industryType: null,
        industryTypeValue:null,
        validity:null,
        showContent: false
      });
    }

    
  }




  industryTypesChange(e) {
  
    this.setState({ 
        industryType: e.value,
        industryTypeValue:e.value.code
    });
   
}
save(){
    alert(this.state.industryTypeValue);
    alert(this.state.validity);
}
handleValidity(e){
    this.setState({ 
        validity: new Date(e.value)
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
        <Panel header="Create Organization" >
    <div class="grid">
    <div class="col-11">
    <Panel header="Enter Details">
    <div class="card">
    <div class="field grid">
        <label for="organizationName" class="col-12 mb-2 md:col-2 md:mb-0">Organization Name</label>
        <div class="col-12 md:col-10">
            <input id="organizationName" type="text" value="Intello group"class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="organizationEmail" class="col-12 mb-2 md:col-2 md:mb-0">Organization Email</label>
        <div class="col-12 md:col-10">
            <input id="organizationEmail" type="text" value="admin@intello.com" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="organizationWebsite" class="col-12 mb-2 md:col-2 md:mb-0">Organization Website</label>
        <div class="col-12 md:col-10">
            <input id="organizationWebsite" type="text" value="www.intellogroup.com" class="inputfield w-full"></input>
        </div>
    </div><div class="field grid">
        <label for="sizeOfEmployee" class="col-12 mb-2 md:col-2 md:mb-0">Size of Employee</label>
        <div class="col-12 md:col-10">
            <input id="sizeOfEmployee" type="text" value="70" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="location" class="col-12 mb-2 md:col-2 md:mb-0">Location</label>
        <div class="col-12 md:col-10">
            <input id="location" type="text" value="Alabama,USA" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="validity" class="col-12 mb-2 md:col-2 md:mb-0">Validity</label>
        <div class="col-12 md:col-2">
        <Calendar value={this.state.validity} dateFormat="mm/dd/yy" onChange={this.handleValidity}></Calendar>
  </div>
    </div>
    <div class="field grid">
        <label for="industryType" class="col-12 mb-2 md:col-2 md:mb-0">Industry Type</label>
        <div class="col-12 md:col-2">
        <Dropdown value={this.state.industryType} options={this.industryTypes} onChange={this.industryTypesChange} optionLabel="name" placeholder="Industry Type" />
        </div>
    </div>
    <div class="field grid">
        <label for="tagLine" class="col-12 mb-2 md:col-2 md:mb-0">Tag Line</label>
        <div class="col-12 md:col-10">
            <input id="tagLine" type="text" value="Your best service provider" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <div class="col-12 md:col-10 col-offset-6">
        <Button label="save" icon="pi pi-user" onClick={this.save} className="p-button-raised p-button-rounded"/>
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

export default withRouter(CreateOrgComponent);


