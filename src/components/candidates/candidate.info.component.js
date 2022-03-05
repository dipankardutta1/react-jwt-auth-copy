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
import { TabView, TabPanel } from 'primereact/tabview';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

 class CandidateInfoComponent extends React.Component {

  constructor(props) {
     
    super(props);
  
    this.onSubmit=this.onSubmit.bind(this);
  
    this.validate=this.validate.bind(this);
    this.isFormFieldValid=this.isFormFieldValid.bind(this);
   this.getFormErrorMessage=this.getFormErrorMessage.bind(this);
   this.save=this.save.bind(this);
   this.state = {
    showContent: true,
    blockedPanel:false,
    };
   
    this.jobTypes = ['Full Time','Part Time', 'Hourly'];
     this.fileTyps=['w4','passport','work authorization','education related','experience related'];
  }//end

  validate = (data) => {
    let errors = {};
    if (!data.name) {
        errors.name = 'Organization Name is required.';
    }
    if (!data.email) {
      errors.email = 'Email is required.';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
    }

    return errors;
};


onSubmit = (data, form) => {
  if(form){
    

    //alert(user.userId);
     this.setState({
        parentUserId : data.parentUserId,
        appStatus:data.appStatus ? data.appStatus : "P",
        userId:data.userId,
        name:data.name,
        contactNumber:data.contactNumber,
        email:data.email,
        confirmEmail:data.confirmEmail,
        jobId:data.jobId,
        jobType:data.jobType,
        fileType:data.fileType,
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
        randomLink:data.randomLink,
        randomLinkValidTill:data.randomLinkValidTill,
        blockedPanel:true
    
    },() => this.save());

  
    
    //this.save();
  }
  
  
};


isFormFieldValid = (meta) => !!(meta.touched && meta.error);
getFormErrorMessage = (meta) => {
    return this.isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
};


  componentDidMount() {
    this.state.blockedPanel=true;

    userService.findCandidateByLink(this.props.match.params.link).then(response => {
      
      this.setState({ 
        blockedPanel:false,
        showContent: true,
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
        randomLink:response.data.output.randomLink,
        randomLinkValidTill:response.data.output.randomLinkValidTill
    });


    }).catch(error => {
      
      this.setState({
        showContent: false,
        blockedPanel:false
      });
      
    });

    
    

    
  }

save(){
    
    
    
    userService.saveCandidate(this.state).then(response => {
              
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
            randomLink:response.data.output.randomLink,
            randomLinkValidTill:response.data.output.randomLinkValidTill,
            blockedPanel:false
      // dob:response.data.output.dob
        });
       
        toast("Candidate Updated");
         
        }else{
         // return null
         this.setState({
          blockedPanel:false
        });
        toast("Candidate Not Updated:Please try Again later");
         //alert("User Not created:email or username is already exist");
        }
    }).catch(error => {
      this.setState({
        blockedPanel:false
      });
      //alert(error)
      toast("Candidate Not Updated:Please try Again later");
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
    {/* <div class="col-3" >
    <SideMenuComponent candidateData={this.state}></SideMenuComponent>
    </div> */}
    <div class="col-9">
   
    <Form onSubmit={this.onSubmit} initialValues={
          { appStatus:this.state.appStatus,
            userId:this.state.userId,
            parentUserId:this.state.parentUserId,
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
            referalAddr:this.state.referalAddr,
            randomLink:this.state.randomLink,
            randomLinkValidTill:this.state.randomLinkValidTill
          }
          }
          validate={this.validate} render={({ handleSubmit,form }) => (
  <form onSubmit={handleSubmit} className="p-fluid">
<TabView>
    <TabPanel header="Basic Information">
    <div class="card">
    <div class="field grid">
        <label for="candidateName" class="col-12 mb-2 md:col-2 md:mb-0">Candidate Name</label>
        <div class="col-12 md:col-10">
        <InputText  hidden value={this.state.appStatus} onChange={(e) => this.setState({appStatus: e.target.value})} />
        <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
        <InputText  hidden value={this.state.parentUserId} onChange={(e) => this.setState({parentUserId: e.target.value})} />
        <InputText  hidden value={this.state.randomLink} onChange={(e) => this.setState({randomLink: e.target.value})} />
        <InputText  hidden value={this.state.randomLinkValidTill} onChange={(e) => this.setState({randomLinkValidTill: e.target.value})} />
        
        

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
        <Button label="save & continue" icon="pi pi-user" type='submit' className="p-button-raised p-button-rounded"/>
        &nbsp; &nbsp; 
        <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
       
        </div>
    </div>
    
</div>

    </TabPanel>
    <TabPanel header="Education">
    <div class="card">
    <div class="field grid">
    {this.state.blockedPanel && <ProgressSpinner/>}
        <label for="universityName" class="col-12 mb-2 md:col-2 md:mb-0">University Name</label>
        <div class="col-12 md:col-10">

         
      
        <Field name="universityName" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="universityName" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="universityName" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>University Name</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />

          
        </div>
    </div>
    <div class="field grid">
        <label for="degree" class="col-12 mb-2 md:col-2 md:mb-0">Degree</label>
        <div class="col-12 md:col-10">
            
            <Field name="degree" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="degree" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="degree" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Degree</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    
    <div class="field grid">
        <label for="startDate" class="col-12 mb-2 md:col-2 md:mb-0">Start Date</label>
        <div class="col-12 md:col-2">
        {/*<Calendar id="startDate" dateFormat="mm/dd/yy" ></Calendar>*/}
        </div>
  </div>
  <div class="field grid">
        <label for="endDate" class="col-12 mb-2 md:col-2 md:mb-0">End Date</label>
        <div class="col-12 md:col-2">
        {/*<Calendar id="endDate" dateFormat="mm/dd/yy" ></Calendar>*/}
  </div>
  </div>
    <div class="field grid">
        <label for="subject" class="col-12 mb-2 md:col-2 md:mb-0">Subject Of Degree</label>
        <div class="col-12 md:col-10">
            
          <Field name="subject" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="subject" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="subject" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Subject Of Degree</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
        <label for="degreeComment" class="col-12 mb-2 md:col-2 md:mb-0">Comment</label>
        <div class="col-12 md:col-10">
        <Field name="degreeComment" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="degreeComment" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="degreeComment" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Comment</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
       <div class="col-3 md:col-3 col-offset-8">
        <Button label="save & continue" type='submit' icon="pi pi-user" className="p-button-raised p-button-rounded"/>
        &nbsp; &nbsp; 
        <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
      </div>
        
    </div>
    

</div>

    </TabPanel>
    <TabPanel header="Experience">
    <div class="card">
    <div class="field grid">
    {this.state.blockedPanel && <ProgressSpinner/>}
        <label for="organizationName" class="col-12 mb-2 md:col-2 md:mb-0">Organization Name</label>
        <div class="col-12 md:col-10">

        
      
        <Field name="organizationName" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="organizationName" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="organizationName" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Organization Name</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />

          
        </div>
    </div>
    <div class="field grid">
        <label for="desiganationType" class="col-12 mb-2 md:col-2 md:mb-0">Desiganation</label>
        <div class="col-12 md:col-10">
            
            <Field name="desiganationType" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="desiganationType" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="desiganationType" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Desiganation</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    
    <div class="field grid">
        <label for="startDate" class="col-12 mb-2 md:col-2 md:mb-0">Start Date</label>
        <div class="col-12 md:col-2">
        {/*<Calendar id="startDate" dateFormat="mm/dd/yy" ></Calendar>*/}
        </div>
  </div>
  <div class="field grid">
        <label for="endDate" class="col-12 mb-2 md:col-2 md:mb-0">End Date</label>
        <div class="col-12 md:col-2">
        {/*<Calendar id="endDate" dateFormat="mm/dd/yy" ></Calendar>*/}
  </div>
  </div>
    <div class="field grid">
        <label for="reportingTo" class="col-12 mb-2 md:col-2 md:mb-0">Reporting To</label>
        <div class="col-12 md:col-10">
            
          <Field name="reportingTo" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="reportingTo" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="reportingTo" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Reporting To</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
        <label for="jobComment" class="col-12 mb-2 md:col-2 md:mb-0">Comment</label>
        <div class="col-12 md:col-10">
        <Field name="jobComment" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="jobComment" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="jobComment" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Comment</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
       <div class="col-3 md:col-3 col-offset-8">
        <Button label="save & continue" type='submit' icon="pi pi-user" className="p-button-raised p-button-rounded"/>
        &nbsp; &nbsp; 
        <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
      </div>
        
    </div>
    
    
</div>

    </TabPanel>
    <TabPanel header="Referral">
    <div class="card">
    <div class="field grid">
    {this.state.blockedPanel && <ProgressSpinner/>}
        <label for="referalType" class="col-12 mb-2 md:col-2 md:mb-0">Referral Type</label>
        <div class="col-12 md:col-10">

        
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
        <Button label="save & continue" type='submit'  icon="pi pi-user" className="p-button-raised p-button-rounded"/>
        &nbsp; &nbsp; 
        <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"/>
      </div>
        
    </div>
    

</div>
    </TabPanel>
    <TabPanel header="Documents">
    <div class="card">
    <div class="field grid">
    <label for="w4" class="col-12 mb-2 md:col-2 md:mb-0">File </label>
       <div class="col-12 md:col-10">
       <FileUpload id="w4" name="w4" url="./upload" maxFileSize="1000000" />
  </div>
  <div class="field grid">
    <label for="fileType" class="col-12 mb-2 md:col-2 md:mb-0">File Type </label>
       <div class="col-12 md:col-10">
       <Field name="fileType" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Dropdown id="fileType" options={this.fileTyps} {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="jobType" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>File Type</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
    </div>
      </div>    
      
  <div class="field grid">
        <div class="col-12 md:col-10 col-offset-6">
        <Button label="save & continue" type='submit' icon="pi pi-user" className="p-button-raised p-button-rounded"/>
        &nbsp; &nbsp;
        <Button label="Send For Review" type='submit' onClick={() => {
                form.change("appStatus", "F");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded"/>
        
        </div>
    </div>
  
  </div>
    
</div>

    </TabPanel>
</TabView>


   
</form>
)}/>
    
    </div>
</div>
        </Panel>
        </BlockUI>
      </div>
    );
     }
  }
}

export default withRouter(CandidateInfoComponent);


