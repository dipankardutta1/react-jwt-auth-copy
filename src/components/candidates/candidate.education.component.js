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
class CandidateEducationComponent extends React.Component {

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
    
  }


  validate = (data) => {
    let errors = {};

    return errors;
  };

  onSubmit = (data, form) => {
    if(form){
      let user = authService.getCurrentUser();
  
      //alert(user.userId);
       this.setState({
        finalizedLevel:data.finalizedLevel ? data.finalizedLevel : "1", 
        parentUserId : data.parentUserId ?  data.parentUserId : user.userId,
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
        address:data.address,
        city:data.city,
        state:data.state,
        pin:data.pin,
        currentUserId:user.userId,
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

    if(!this.props.location.state){
      this.props.history.push({
        pathname: "/basicInfoEntry"
      });
    }

    this.state.blockedPanel=false;
    
    const user = authService.getCurrentUser();

    if (user && (user.permissions.includes("CREATE_CANDIDATE") || user.permissions.includes("EDIT_CANDIDATE")
    || user.permissions.includes("REVIEW_CANDIDATE")  || user.permissions.includes("CANDIDATE_ENTRY"))) {

        

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
            degreeStartDate:this.props.location.state ? new Date(this.props.location.state.degreeStartDate) : "",
          degreeEndDate:this.props.location.state ? new Date(this.props.location.state.degreeEndDate) : "",
          jobStartDate:this.props.location.state ? this.props.location.state.jobStartDate : "",
          jobEndDate:this.props.location.state ? this.props.location.state.jobEndDate : "",
          parentUserId:this.props.location.state ? this.props.location.state.parentUserId : "",
          address:this.props.location.state ? this.props.location.state.address : "",
          city:this.props.location.state ? this.props.location.state.city : "",
          state:this.props.location.state ? this.props.location.state.state : "",
          pin:this.props.location.state ? this.props.location.state.pin : ""
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
                degreeStartDate:new Date(response.data.output.degreeStartDate),
                degreeEndDate:new Date(response.data.output.degreeEndDate),
                jobStartDate:response.data.output.jobStartDate,
                jobEndDate:response.data.output.jobEndDate,
                address:response.data.output.address,
                city:response.data.output.city,
                state:response.data.output.state,
                pin:response.data.output.pin,
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
            jobEndDate:this.state.jobEndDate,
            parentUserId:this.state.parentUserId,
            address:this.state.address,
            city:this.state.city,
            state:this.state.state,
            pin:this.state.pin
          }
          }
          validate={this.validate} render={({ handleSubmit }) => (
    <form onSubmit={handleSubmit} className="p-fluid">


    <div class="card">
    <div class="field grid">
    {this.state.blockedPanel && <ProgressSpinner/>}
        <label for="universityName" class="col-12 mb-2 md:col-2 md:mb-0">University Name</label>
        <div class="col-12 md:col-10">

        <InputText  hidden value={this.state.appStatus} onChange={(e) => this.setState({appStatus: e.target.value})} />
        <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
        <InputText  hidden value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
        <InputText  hidden value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        <InputText  hidden value={this.state.confirmEmail} onChange={(e) => this.setState({confirmEmail: e.target.value})} />
        <InputText  hidden value={this.state.contactNumber} onChange={(e) => this.setState({contactNumber: e.target.value})} />
        <InputText  hidden value={this.state.dob} onChange={(e) => this.setState({dob: e.target.value})} />
        <InputText  hidden value={this.state.jobId} onChange={(e) => this.setState({jobId: e.target.value})} />
        <InputText  hidden value={this.state.jobType} onChange={(e) => this.setState({jobType: e.target.value})} />
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
        <InputText  hidden value={this.state.jobStartDate} onChange={(e) => this.setState({jobStartDate: e.target.value})} />
        <InputText  hidden value={this.state.jobEndDate} onChange={(e) => this.setState({jobEndDate: e.target.value})} />
        <InputText  hidden value={this.state.parentUserId} onChange={(e) => this.setState({parentUserId: e.target.value})} />
        <InputText  hidden value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} />
        <InputText  hidden value={this.state.city} onChange={(e) => this.setState({city: e.target.value})} />
        <InputText  hidden value={this.state.state} onChange={(e) => this.setState({state: e.target.value})} />
        <InputText  hidden value={this.state.pin} onChange={(e) => this.setState({pin: e.target.value})} />
        
        
      
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
        <div class="col-12 md:col-6">
        <Field name="degreeStartDate" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Calendar id="degreeStartDate" showIcon={true} monthNavigator yearNavigator yearRange='1900:2300'
                    maxDate={new Date()}  dateFormat="mm/dd/yy" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="degreeStartDate" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Start Date</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
        )} />
        </div>
  </div>
  <div class="field grid">
        <label for="endDate" class="col-12 mb-2 md:col-2 md:mb-0">End Date</label>
        <div class="col-12 md:col-6">
        <Field name="degreeEndDate" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Calendar id="degreeEndDate" showIcon={true} monthNavigator yearNavigator yearRange='1900:2300'
                    maxDate={new Date()}  dateFormat="mm/dd/yy" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="degreeEndDate" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>End Date</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
        )} />
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
       <div class="col-3 md:col-3 col-offset-8" hidden={this.state.appStatus == 'Y'  || this.state.appStatus == 'N' }>
        <Button label="save & continue" type='submit' icon="pi pi-user" className="p-button-raised p-button-rounded"
        disabled={this.state.appStatus == 'C' && !authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY")}
        hidden={this.state.appStatus != 'C' && authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY")}/>
        &nbsp; &nbsp; 
        <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"
        hidden={authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY")}/>
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

export default withRouter(CandidateEducationComponent);


