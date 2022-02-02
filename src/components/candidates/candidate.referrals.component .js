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
import { InputTextarea } from 'primereact/inputtextarea';
import SideMenuComponent from '../menu/SideMenu';
import authService from '../../services/auth.service';

class CandidateReferralComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onMenubarClick=this.onMenubarClick.bind(this);
    this.save=this.save.bind(this);
    this.onReferralChange=this.onReferralChange.bind(this);
    
    this.state = {
      referral:null,
      referralCode:null,
      showContent: false
    };
   
    this.referrals = [
      
      { name: 'Internal', code: 'internal' },
      { name: 'External', code: 'External' }
      
  ];
    
  }



  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_CANDIDATE")) {
      
      this.setState({
        referral:null,
        referralCode:null,
        showContent: true
      });
    }else{
      this.setState({
        referral:null,
        referralCode:null,
        showContent: false
      });
    }

    
  }

  onMenubarClick = (path) => {
   
    this.props.history.push(path);
}
onReferralChange(e){
  this.setState({ 
    referral: e.value,
    referralCode: e.value.code
});
}
save(){
  alert(this.state.referralCode);
  
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
        <label for="referralType" class="col-12 mb-2 md:col-2 md:mb-0">Referral Type</label>
        <div class="col-12 md:col-2">
        <Dropdown value={this.state.referral} options={this.referrals} onChange={this.onReferralChange} optionLabel="name" placeholder="Job Type" />
      </div>
    </div>
    <div class="field grid">
        <label for="id" class="col-12 mb-2 md:col-2 md:mb-0">User Id/Employee Id</label>
        <div class="col-12 md:col-10">
            <input id="id" type="text" value="emp007" class="inputfield w-full"></input>
        </div>
    </div>
    <div class="field grid">
        <label for="refName" class="col-12 mb-2 md:col-2 md:mb-0">Ref: Id/Company</label>
        <div class="col-12 md:col-10">
            <input id="refName" type="text" value="kgm@office.com" class="inputfield w-full"></input>
        </div>
    </div><div class="field grid">
        <label for="refEmail" class="col-12 mb-2 md:col-2 md:mb-0">Referral Email</label>
        <div class="col-12 md:col-10">
            <input id="refEmail" type="text" value="som@gmail" class="inputfield w-full"></input>
        </div>
    </div><div class="field grid">
        <label for="refContact" class="col-12 mb-2 md:col-2 md:mb-0">Referral Contact</label>
        <div class="col-12 md:col-10">
        <input id="refContact" type="text" value="som@gmail" class="inputfield w-full"></input>
  </div>
    </div><div class="field grid">
        <label for="refAddress" class="col-12 mb-2 md:col-2 md:mb-0">Referral Address</label>
        <div class="col-12 md:col-1">
        <InputTextarea id="refAddress" rows={3} cols={30}   autoResize />
 
        </div>
    </div>
   
    <div class="field grid">
        <div class="col-10 md:col-6 col-offset-7">
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

export default withRouter(CandidateReferralComponent);


