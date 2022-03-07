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
import userService from '../../services/user.service';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import {toast} from 'react-toastify';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
 


import SideMenuComponent from '../menu/SideMenu';
class CandidateReferralComponent extends React.Component {

  constructor(props) {
    super(props);
    

    this.onSubmit=this.onSubmit.bind(this);
  
    this.validate=this.validate.bind(this);
    this.isFormFieldValid=this.isFormFieldValid.bind(this);
   this.getFormErrorMessage=this.getFormErrorMessage.bind(this);
   this.save=this.save.bind(this);
   this.state = {
    showContent: false,
    blockedPanel:false,
    };
    
  }


  validate = (data) => {
    let errors = {};

    return errors;
  };

  onSubmit = (data, form) => {

   
    
    if(form){
      let user = authService.getCurrentUser();

      let appStat = "";
      if(data.saveType=="P"){
        appStat = data.appStatus ? data.appStatus : "P";
      }else if(data.saveType=="C"){
        appStat = "C"
      }else if(data.saveType=="R"){
        appStat = "R"
      }
  
      
       this.setState({
        parentUserId : user.userId,
        appStatus:appStat,
        userId:data.userId,
        name:data.name,
        contactNumber:data.contactNumber,
        email:data.email,
        confirmEmail:data.confirmEmail,
        jobId:data.jobId,
        jobType:data.jobType,
        universityName:data.universityName,
        degree:data.degree,
        subject:data.subject,
        degreeComment:data.degreeComment,
        organizationName:data.organizationName,
        desiganationType:data.desiganationType,
        reportingTo:data.reportingTo,
        jobComment:data.jobComment,
        referalType:data.referalType,
        referalUserId:data.referalUserId,
        referalCompany:data.referalCompany,
        referalEmail:data.referalEmail,
        referalContact:data.referalContact,
        referalAddr:data.referalAddr,
        blockedPanel:true
      
      },() => this.save());
   
      
    }
    
    
  };


  isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  getFormErrorMessage = (meta) => {
      return this.isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };




  componentDidMount() { // New Method added By Dipankar

    if(!this.props.location.state){
      this.props.history.push({
        pathname: "/basicInfoEntry"
      });
    }

    this.state.blockedPanel=false;
    
    const user = authService.getCurrentUser();

    if (user && user.permissions.includes("CREATE_CANDIDATE")) {

        

        this.setState({
          showContent: true,
          blockedPanel:false,
          appStatus:this.props.location.state ? this.props.location.state.appStatus : "",
          userId:this.props.location.state ? this.props.location.state.userId : "",
          name: this.props.location.state ? this.props.location.state.name : "",
          contactNumber: this.props.location.state ? this.props.location.state.contactNumber : "",
          email: this.props.location.state ? this.props.location.state.email : "",
          confirmEmail: this.props.location.state ? this.props.location.state.confirmEmail : "",
          jobId: this.props.location.state ? this.props.location.state.jobId : "",
          jobType:this.props.location.state ? this.props.location.state.jobType : "",
          universityName:this.props.location.state ? this.props.location.state.universityName : "",
          degree:this.props.location.state ? this.props.location.state.degree : "",
          subject:this.props.location.state ? this.props.location.state.subject : "",
          degreeComment:this.props.location.state ? this.props.location.state.degreeComment : "",
          organizationName:this.props.location.state ? this.props.location.state.organizationName : "",
          desiganationType:this.props.location.state ? this.props.location.state.desiganationType : "",
          reportingTo:this.props.location.state ? this.props.location.state.reportingTo : "",
          jobComment:this.props.location.state ? this.props.location.state.jobComment : "",
          referalType:this.props.location.state ? this.props.location.state.referalType : "",
          referalUserId:this.props.location.state ? this.props.location.state.referalUserId : "",
          referalCompany:this.props.location.state ? this.props.location.state.referalCompany : "",
          referalEmail:this.props.location.state ? this.props.location.state.referalEmail : "",
          referalContact:this.props.location.state ? this.props.location.state.referalContact : "",
          referalAddr:this.props.location.state ? this.props.location.state.referalAddr : ""
        });


     

      
      
    }else{
      this.setState({
        showContent: false,
        blockedPanel:false
        });
    }

    
  }
  

  save(){
    
    
    //alert(JSON.stringify(this.state));
    
    userService.saveUser(this.state).then(response => {
              
        if (response.data.output) {
          //alert(response.data.output.userId);
          this.setState({ 
            appStatus:response.data.output.appStatus,
            userId:response.data.output.userId,
            parentUserId:response.data.output.parentUserId,
            name:response.data.output.name,
            email:response.data.output.email,
            confirmEmail:response.data.output.componentDidMount,
            contactNumber:response.data.output.contactNumber,
            jobId:response.data.output.jobId,
            jobType:response.data.output.jobType,
            universityName:response.data.output.universityName,
            degree:response.data.output.degree,
            subject:response.data.output.subject,
            degreeComment:response.data.output.degreeComment,
            organizationName:response.data.output.organizationName,
            desiganationType:response.data.output.desiganationType,
            reportingTo:response.data.output.reportingTo,
            jobComment:response.data.output.jobComment,
            referalType:response.data.output.referalType,
            referalUserId:response.data.output.referalUserId,
            referalCompany:response.data.output.referalCompany,
            referalEmail:response.data.output.referalEmail,
            referalContact:response.data.output.referalContact,
            referalAddr:response.data.output.referalAddr,
            blockedPanel:false
      // dob:response.data.output.dob
        });
        
       
        toast("Candidate Created/Updated");
         
        }else{
         // return null
         this.setState({
          blockedPanel:false
        });
        toast("Candidate Not created:email  is already exist");
         //alert("User Not created:email or username is already exist");
        }
    }).catch(error => {
      this.setState({
        blockedPanel:false
      });
      toast("Email or username is already exist");
      //return null;
    });

    
    

}


sendToCandidate(){
  alert(JSON.stringify(this.state));
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
        <BlockUI blocked={this.state.blockedPanel}  fullScreen>
        <Panel header="Candidate Registration" >
          <div class="grid">
    <div class="col-3" >
    <SideMenuComponent candidateData={this.state}></SideMenuComponent>
    </div>
    <div class="col-9">
    <Panel header="Candidate Information Entry">

    <Form onSubmit={this.onSubmit} initialValues={
          { appStatus:this.state.appStatus,
            userId:this.state.userId,
            name:this.state.name,
            contactNumber:this.state.contactNumber,
            email:this.state.email,
            confirmEmail:this.state.confirmEmail,
            jobId:this.state.jobId,
            jobType:this.state.jobType,
            universityName:this.state.universityName,
            degree:this.state.degree,
            subject:this.state.subject,
            degreeComment:this.state.degreeComment,
            organizationName:this.state.organizationName,
            desiganationType:this.state.desiganationType,
            reportingTo:this.state.reportingTo,
            jobComment:this.state.jobComment,
            referalType:this.state.referalType,
            referalUserId:this.state.referalUserId,
            referalCompany:this.state.referalCompany,
            referalEmail:this.state.referalEmail,
            referalContact:this.state.referalContact,
            referalAddr:this.state.referalAddr
          }
          }
          validate={this.validate} render={({ handleSubmit ,form}) => (
    <form onSubmit={handleSubmit} className="p-fluid">


    <div class="card">
    <div class="field grid">
    {this.state.blockedPanel && <ProgressSpinner/>}
        <label for="referalType" class="col-12 mb-2 md:col-2 md:mb-0">Referral Type</label>
        <div class="col-12 md:col-10">

        <InputText  hidden value={this.state.appStatus} onChange={(e) => this.setState({appStatus: e.target.value})} />
        <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
        <InputText  hidden value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
        <InputText  hidden value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        <InputText  hidden value={this.state.confirmEmail} onChange={(e) => this.setState({confirmEmail: e.target.value})} />
        <InputText  hidden value={this.state.contactNumber} onChange={(e) => this.setState({contactNumber: e.target.value})} />
        <InputText  hidden value={this.state.jobId} onChange={(e) => this.setState({jobId: e.target.value})} />
        <InputText  hidden value={this.state.jobType} onChange={(e) => this.setState({jobType: e.target.value})} />
        <InputText  hidden value={this.state.organizationName} onChange={(e) => this.setState({organizationName: e.target.value})} />
        <InputText  hidden value={this.state.desiganationType} onChange={(e) => this.setState({desiganationType: e.target.value})} />
        <InputText  hidden value={this.state.reportingTo} onChange={(e) => this.setState({reportingTo: e.target.value})} />
        <InputText  hidden value={this.state.jobComment} onChange={(e) => this.setState({jobComment: e.target.value})} />
        <InputText  hidden value={this.state.universityName} onChange={(e) => this.setState({universityName: e.target.value})} />
        <InputText  hidden value={this.state.degree} onChange={(e) => this.setState({degree: e.target.value})} />
        <InputText  hidden value={this.state.subject} onChange={(e) => this.setState({subject: e.target.value})} />
        <InputText  hidden value={this.state.degreeComment} onChange={(e) => this.setState({degreeComment: e.target.value})} />
        
      
        <Field name="referalType" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="referalType" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="referalType" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Referral Type</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />

          
        </div>
    </div>
    <div class="field grid">
        <label for="referalUserId" class="col-12 mb-2 md:col-2 md:mb-0">User Id/Employee Id</label>
        <div class="col-12 md:col-10">
            
            <Field name="referalUserId" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="referalUserId" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="referalUserId" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>User Id/Employee Id</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    
    <div class="field grid">
        <label for="referalCompany" class="col-12 mb-2 md:col-2 md:mb-0">Ref: Id/Company</label>
        <div class="col-12 md:col-10">
        <Field name="referalCompany" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="referalCompany" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="referalCompany" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Ref: Id/Company</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
  </div>
  <div class="field grid">
        <label for="referalEmail" class="col-12 mb-2 md:col-2 md:mb-0">Referral Email</label>
        <div class="col-12 md:col-10">
        <Field name="referalEmail" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="referalEmail" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="referalEmail" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Referral Email</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
  </div>
  </div>
    <div class="field grid">
        <label for="referalContact" class="col-12 mb-2 md:col-2 md:mb-0">Referral Contact</label>
        <div class="col-12 md:col-10">
            
          <Field name="referalContact" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="referalContact" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="referalContact" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Referral Contact</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
        <label for="referalAddr" class="col-12 mb-2 md:col-2 md:mb-0">Referral Address</label>
        <div class="col-12 md:col-10">
        <Field name="referalAddr" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="referalAddr" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="referalAddr" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Referral Address</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
       <div class="col-3 md:col-3 col-offset-8">
        <Button label="save & continue" type='submit' onClick={() => {
                form.change("saveType", "P");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded"/>
        &nbsp; &nbsp; 
        <Button label="Send To Candidate" type='submit' onClick={() => {
                form.change("saveType", "C");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded"/>
        &nbsp; &nbsp; 
        <Button label="Send To Reviewer" type='submit' onClick={() => {
                form.change("saveType", "R");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded" hidden={!(this.state.appStatus == 'F')} /> 
         &nbsp; &nbsp;
        <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
      </div>
        
    </div>
    

</div>

</form>
)}/>
    </Panel>
    </div>
</div>
        </Panel>
        </BlockUI>
      </div>
    );
    } 
  }
}

export default withRouter(CandidateReferralComponent);


