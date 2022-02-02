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

 class SideMenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onMenubarClick=this.onMenubarClick.bind(this);
    this.changeToBasic=this.changeToBasic.bind(this);
    this.changeToEducation=this.changeToEducation.bind(this);
    this.changeToDocument=this.changeToDocument.bind(this);
    this.changeToExperience=this.changeToExperience.bind(this);
    this.changeToReferral=this.changeToReferral.bind(this);
    
  }
  onMenubarClick = (path) => {
   
    this.props.history.push(path);
}
           
changeToBasic=()=>{
  this.props.history.push("/basicInfoEntry");
}
changeToEducation=()=>{
  
  this.props.history.push("/educationEntry");
}
changeToExperience=()=>{
  this.props.history.push("/experienceEntry");
}
changeToDocument=()=>{
  this.props.history.push("/documentUpload");
}
changeToReferral=()=>{
  this.props.history.push("/referralEntry");
}

  render() {
        
     return (
    <div>
       
   
    <Panel header="Candidate Information">
    <div class="grid">
    <div class="col-12 col-offset-1" >
    <label for="fileUpload" >File Upload</label>
     <FileUpload id="fileUpload" name="demo" url="./upload"  mode="basic" className="p-button-raised p-button-rounded" />
    </div>
    
    <div class="col-12 col-offset-1" >
    <Button label="Basic information" icon="pi pi-check" onClick={this.changeToBasic} className="p-button-raised p-button-rounded"/>
    </div>
    <div class="col-12 col-offset-1">
    <Button label="Education info" icon="pi pi-pencil" onClick={this.changeToEducation} className="p-button-raised p-button-rounded"/>
    </div>
    <div class="col-12 col-offset-1">
    <Button label="Experience info" icon="pi pi-id-card" onClick={this.changeToExperience} className="p-button-raised p-button-rounded"/>
    </div>
    <div class="col-12 col-offset-1">
    <Button label="Referral" icon="pi pi-user" onClick={this.changeToReferral} className="p-button-raised p-button-rounded"/>
    </div>
    <div class="col-12 col-offset-1">
    <Button label="Document Upload" icon="pi pi-upload" onClick={this.changeToDocument} className="p-button-raised p-button-rounded"/>
    </div>
    
    </div>
    
    </Panel>
    
    </div>
       
     
    );
  }
}

export default withRouter(SideMenuComponent);


