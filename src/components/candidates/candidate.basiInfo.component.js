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
import userService from '../../services/user.service';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import {toast} from 'react-toastify';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

 class CandidateBasicInfoComponent extends React.Component {

  constructor(props) {
    super(props);
  
    this.onSubmit=this.onSubmit.bind(this);
  
    this.validate=this.validate.bind(this);
    this.isFormFieldValid=this.isFormFieldValid.bind(this);
   this.getFormErrorMessage=this.getFormErrorMessage.bind(this);
   this.save=this.save.bind(this);
   this.state = {
    selectedRoles:['ROLE_CANDIDATE'],
    showContent: false,
    blockedPanel:false,
    };
   
    this.jobTypes = ['Full Time','Part Time', 'Hourly'];
     
  }//end

  validate = (data) => {
    let errors = {};
    if (!data.name) {
        errors.name = 'Organization Name is required.';
    }

    if (!data.contactNumber) {
      errors.contactNumber = 'Contact Number is required.';
    }else if(isNaN(data.contactNumber)){
      errors.contactNumber = 'Contact Number  is not valid.';
    }
    if (!data.email) {
      errors.email = 'Email is required.';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
    }

    if (!data.confirmEmail) {
      errors.confirmEmail = 'Confirm Email is required.';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.confirmEmail)) {
      errors.confirmEmail = 'Invalid email address. E.g. example@email.com';
    }else if(data.email != data.confirmEmail){
      errors.email = 'Email and Confirm Email are not same';
      errors.confirmEmail = 'Email and Confirm Email are not same';
    }

    if (!data.dob) {
      errors.dob = 'Date of Birth of Candidate is required.';
    }
    

    return errors;
};


onSubmit = (data, form) => {
  if(form){
    let user = authService.getCurrentUser();

    //alert(user.userId);
     this.setState({
      finalizedLevel:data.finalizedLevel ? data.finalizedLevel : "1", 
        parentUserId : user.userId,
        appStatus:data.appStatus ? data.appStatus : "P",
        userId:data.userId,
        name:data.name,
        degreeStartDate:data.degreeStartDate,
        degreeEndDate:data.degreeEndDate,
        contactNumber:data.contactNumber,
        email:data.email,
        confirmEmail:data.confirmEmail,
        dob:data.dob,
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
        jobStartDate:data.jobStartDate,
        jobEndDate:data.jobEndDate,
        blockedPanel:true
    
    },() => this.save());

  
    
    //this.save();
  }
  
  
};


isFormFieldValid = (meta) => !!(meta.touched && meta.error);
getFormErrorMessage = (meta) => {
    return this.isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
};


  componentDidMount() { // New Method added By Dipankar

   

    this.state.blockedPanel=false;
    const user = authService.getCurrentUser();

    if (user && (user.permissions.includes("CREATE_CANDIDATE") || user.permissions.includes("EDIT_CANDIDATE")
    || user.permissions.includes("REVIEW_CANDIDATE"))) {
      alert(this.props.location.state ? this.props.location.state.dob : "");
      this.setState({
        showContent: true,
        blockedPanel:false,
        appStatus:this.props.location.state ? this.props.location.state.appStatus : "",
        finalizedLevel:this.props.location.state ? this.props.location.state.finalizedLevel : "",
        userId:this.props.location.state ? this.props.location.state.userId : "",
        name: this.props.location.state ? this.props.location.state.name : "",
        contactNumber: this.props.location.state ? this.props.location.state.contactNumber : "",
        email: this.props.location.state ? this.props.location.state.email : "",
        confirmEmail: this.props.location.state ? this.props.location.state.confirmEmail : "",
        dob:this.props.location.state ? this.props.location.state.dob : "",
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
          referalAddr:this.props.location.state ? this.props.location.state.referalAddr : "",
          degreeStartDate:this.props.location.state ? this.props.location.state.degreeStartDate : "",
        degreeEndDate:this.props.location.state ? this.props.location.state.degreeEndDate : "",
        jobStartDate:this.props.location.state ? this.props.location.state.jobStartDate : "",
        jobEndDate:this.props.location.state ? this.props.location.state.jobEndDate : ""
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

   
    authService.saveUser(JSON.stringify(this.state)).then(response => {

      if (response.data.obj.userId) {

        this.setState({
          userId : response.data.obj.userId
        });

        userService.saveUser(this.state).then(response => {
                  
            if (response.data.output) {
              //alert(response.data.output.userId);
              this.setState({ 
                appStatus:response.data.output.appStatus,
                finalizedLevel:response.data.output.finalizedLevel,
                userId:response.data.output.userId,
                parentUserId:response.data.output.parentUserId,
                name:response.data.output.name,
                email:response.data.output.email,
                confirmEmail:response.data.output.confirmEmail,
                dob:response.data.output.dob,
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
                degreeStartDate:response.data.output.degreeStartDate,
                degreeEndDate:response.data.output.degreeEndDate,
                jobStartDate:response.data.output.jobStartDate,
                jobEndDate:response.data.output.jobEndDate,
                blockedPanel:false
          // dob:response.data.output.dob
            });
          
            toast("Candidate Created/Updated");
            
            }else{
            // return null
            this.setState({
              blockedPanel:false
            });
            toast("Error:email  is already exist");
            //alert("User Not created:email or username is already exist");
            }
        }).catch(error => {
          this.setState({
            blockedPanel:false
          });
          //alert(error)
          toast("Error:Please try again!"+error);
          //return null;
        });
      }else{
        this.setState({
          blockedPanel:false
        });
        toast("Error:Please try again!");
        //alert("User Not Updated:email or username is already exist");
      }

  }).catch(error => {
    this.setState({
      blockedPanel:false
    });
    //alert(error)
    toast("Error:Please try again!");
    //return null;
  });;

    
    

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
            finalizedLevel:this.state.finalizedLevel,
            userId:this.state.userId,
            name:this.state.name,
            contactNumber:this.state.contactNumber,
            email:this.state.email,
            confirmEmail:this.state.confirmEmail,
            dob:this.state.dob,
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
            referalAddr:this.state.referalAddr,
            degreeEndDate:this.state.degreeEndDate,
            degreeStartDate:this.state.degreeStartDate,
            jobStartDate:this.state.jobStartDate,
            jobEndDate:this.state.jobEndDate
          }
          }
          validate={this.validate} render={({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="p-fluid">

    <div class="card">
    <div class="field grid">
        <label for="candidateName" class="col-12 mb-2 md:col-2 md:mb-0">Candidate Name</label>
        <div class="col-12 md:col-10">
        <InputText  hidden value={this.state.appStatus} onChange={(e) => this.setState({appStatus: e.target.value})} />
        <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
        <InputText  hidden value={this.state.universityName} onChange={(e) => this.setState({universityName: e.target.value})} />
        <InputText  hidden value={this.state.degree} onChange={(e) => this.setState({degree: e.target.value})} />
        <InputText  hidden value={this.state.subject} onChange={(e) => this.setState({subject: e.target.value})} />
        <InputText  hidden value={this.state.degreeComment} onChange={(e) => this.setState({degreeComment: e.target.value})} />
        <InputText  hidden value={this.state.organizationName} onChange={(e) => this.setState({organizationName: e.target.value})} />
        <InputText  hidden value={this.state.desiganationType} onChange={(e) => this.setState({desiganationType: e.target.value})} />
        <InputText  hidden value={this.state.reportingTo} onChange={(e) => this.setState({reportingTo: e.target.value})} />
        <InputText  hidden value={this.state.jobComment} onChange={(e) => this.setState({jobComment: e.target.value})} />
        <InputText  hidden value={this.state.referalType} onChange={(e) => this.setState({referalType: e.target.value})} />
        <InputText  hidden value={this.state.referalUserId} onChange={(e) => this.setState({referalUserId: e.target.value})} />
        <InputText  hidden value={this.state.referalCompany} onChange={(e) => this.setState({referalCompany: e.target.value})} />
        <InputText  hidden value={this.state.referalEmail} onChange={(e) => this.setState({referalEmail: e.target.value})} />
        <InputText  hidden value={this.state.referalContact} onChange={(e) => this.setState({referalContact: e.target.value})} />
        <InputText  hidden value={this.state.referalAddr} onChange={(e) => this.setState({referalAddr: e.target.value})} />
        <InputText  hidden value={this.state.finalizedLevel} onChange={(e) => this.setState({finalizedLevel: e.target.value})} />
        <InputText  hidden value={this.state.degreeEndDate} onChange={(e) => this.setState({degreeEndDate: e.target.value})} />
        <InputText  hidden value={this.state.degreeStartDate} onChange={(e) => this.setState({degreeStartDate: e.target.value})} />
        <InputText  hidden value={this.state.jobStartDate} onChange={(e) => this.setState({jobStartDate: e.target.value})} />
        <InputText  hidden value={this.state.jobEndDate} onChange={(e) => this.setState({jobEndDate: e.target.value})} />
        
        
        

        <Field name="name" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="name" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Candidate Name</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />


        </div>
    </div>
    <div class="field grid">
        <label for="candidateNumber" class="col-12 mb-2 md:col-2 md:mb-0">Candidate Number</label>
        <div class="col-12 md:col-10">
        
        <Field name="contactNumber" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="contactNumber" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="contactNumber" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Candidate Number</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />

     </div>
    </div>
    <div class="field grid">
        <label for="email" class="col-12 mb-2 md:col-2 md:mb-0">Email</label>
        <div class="col-12 md:col-10">
        
        <Field name="email" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="email" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="email" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Email</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
        )} />


       </div>
    </div><div class="field grid">
        <label for="confirmEmail" class="col-12 mb-2 md:col-2 md:mb-0">Confirm Email</label>
        <div class="col-12 md:col-10">
        
        <Field name="confirmEmail" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="confirmEmail" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="confirmEmail" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Confirm Email</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
        )} />

     </div>
     {this.state.blockedPanel && <ProgressSpinner/>}
    </div><div class="field grid">
        <label for="dob" class="col-12 mb-2 md:col-2 md:mb-0">Date Of Birth</label>
        <div class="col-12 md:col-2">
        <Field name="dob" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Calendar id="dob" monthNavigator yearNavigator yearRange='1900:2300'
                    maxDate={new Date()}  dateFormat="mm/dd/yy" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="dob" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>DOB</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
        )} />

        {/* <Calendar value={this.dob} dateFormat="mm/dd/yy" onChange={this.handleDob}></Calendar> */}
  </div>
    </div><div class="field grid">
        <label for="jobId" class="col-12 mb-2 md:col-2 md:mb-0">Job Id</label>
        <div class="col-12 md:col-10">
        
        <Field name="jobId" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="jobId" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="jobId" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Job Id</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
        )} />
      </div>
    </div>
    <div class="field grid">
        <label for="jobType" class="col-12 mb-2 md:col-2 md:mb-0">Job Type</label>
        <div class="col-12 md:col-2">
        
        <Field name="jobType" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Dropdown id="jobType" options={this.jobTypes} {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="jobType" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Job Type</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        
        </div>
    </div>
    <div class="field grid">
        <div class="col-3 md:col-3 col-offset-8">
        <Button label="save & continue" icon="pi pi-user" type='submit' className="p-button-raised p-button-rounded"
        disabled={this.state.appStatus == 'C'}/>
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

export default withRouter(CandidateBasicInfoComponent);


