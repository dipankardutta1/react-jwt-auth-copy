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
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SideMenuComponent from '../menu/SideMenu';
class CandidateDocumentUploadComponent extends React.Component {

  constructor(props) {
    super(props);
    

    this.onSubmit=this.onSubmit.bind(this);
    this.myUploader=this.myUploader.bind(this);
    this.validate=this.validate.bind(this);
    this.isFormFieldValid=this.isFormFieldValid.bind(this);
   this.getFormErrorMessage=this.getFormErrorMessage.bind(this);
   this.save=this.save.bind(this);
   this.state = {
    selectedRoles:['ROLE_CANDIDATE'],
    fileTyps:['w4','passport','work authorization','education related','experience related'],
    fileType:'',
    file:'',
    clear:false,
    showContent: false,
    blockedPanel:false,
    };
    
  }


  validate = (data) => {
    let errors = {};

    

    if(this.state.appStatus == 'R'  && 
    authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE") 
    && !data.salaryPerMonth){
      errors.salaryPerMonth = 'Salary Per Month is required.';
    }

    if(this.state.appStatus == 'R'  && 
    authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE") 
    && !data.ctc){
      errors.ctc = 'CTC is required.';
    }

    if(this.state.appStatus == 'R'  && 
    authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE") 
    && !data.superviser){
      errors.superviser = 'Superviser Name is required.';
    }

    if(this.state.appStatus == 'R'  && 
    authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE") 
    && !data.reportee){
      errors.reportee = 'Reportee Name is required.';
    }

    if(this.state.appStatus == 'R'  && 
    authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE") 
    && !data.joiningDate){
      errors.joiningDate = 'Joining Date is required.';
    }

    
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
      }else if(data.saveType=="F"){
        appStat = "F"
      }else if(data.saveType=="Y"){
        appStat = "Y"
      }else if(data.saveType=="N"){
        appStat = "N"
      }
  
      
       this.setState({
        finalizedLevel:data.finalizedLevel ? data.finalizedLevel : "1", 
        parentUserId : data.parentUserId ?  data.parentUserId : user.userId,
        appStatus:appStat,
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
        salaryPerMonth:data.salaryPerMonth,
        ctc:data.ctc,
        superviser:data.superviser,
        reportee:data.reportee,
        joiningDate:data.joiningDate,
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

    if (user && (user.permissions.includes("CREATE_CANDIDATE") || user.permissions.includes("EDIT_CANDIDATE")
    || user.permissions.includes("REVIEW_CANDIDATE") || user.permissions.includes("CANDIDATE_ENTRY") )) {

        

  
      this.setState({
        showContent: true,
        blockedPanel:true,
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
        jobEndDate:this.props.location.state ? this.props.location.state.jobEndDate : "",
        parentUserId:this.props.location.state ? this.props.location.state.parentUserId : "",
        address:this.props.location.state ? this.props.location.state.address : "",
        city:this.props.location.state ? this.props.location.state.city : "",
        state:this.props.location.state ? this.props.location.state.state : "",
        pin:this.props.location.state ? this.props.location.state.pin : "",
        files:  []
        });

        if(this.props.location.state){
          userService.findDocumentsByUserId(this.props.location.state.userId).then(response => {
            //alert(JSON.stringify(response.data.output));
            this.setState({
              blockedPanel:false,
              files:  response.data.output
            });
           
          });
        }
        
        
      
      
    }else{
      this.setState({
        showContent: false,
        blockedPanel:false
        });
    }

    
  }
  myUploader(event){
    //event.files == files to upload
    if(this.state.fileType){

      this.setState({
        blockedPanel:true
        });

      var fd = new FormData();
      const API_URL = "http://localhost:9000/resource";
      event.files.forEach(fileToUpload => {
        
        fd.append('file', fileToUpload);
       
      });
      
      fd.append('userId',this.state.userId);
      fd.append('fileType',this.state.fileType);
      axios.post(API_URL + '/user/docUpload',fd,{headers: authHeader()}).then(response => {
       
        this.fileUploaderRef.clear();
        userService.findDocumentsByUserId(this.state.userId).then(response => {
          toast("Document uploaded ! ");
          this.setState({
            blockedPanel:false,
            files:  response.data.output
          });
        });
      },
      error=>{
        toast("Error: Please try again");
        this.setState({
          blockedPanel:false
          });
      });
    }else{
      toast("Please select File type!");
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
                address:response.data.output.address,
                city:response.data.output.city,
                state:response.data.output.state,
                pin:response.data.output.pin,
                blockedPanel:false
          // dob:response.data.output.dob
            });
          
            if(response.data.output.appStatus == "C"){
              toast("Email Sent to Candidate.");
            }else if(response.data.output.appStatus == "Y"){
              
                toast("Offer Letter sent");
              
            }else{
              toast("Candidate Created/Updated");
            }
           
            
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

editRow(rowData) {
  return (<div>
    <Button
      type="button" icon="pi pi-download" value="Edit"
      className="ui-button-success" onClick={() => this.downloadFile(rowData)}
    />
    
  </div>);

}
downloadFile(rowData){


userService.downloadDocumentsByUserIdAndDocId(this.state.userId,rowData.fileName).then(response => {

  var a = document.createElement("a"); //Create <a>
  
  a.href = "data:"+response.data.fileType+";base64,"+response.data.content ; // Base64 Goes here
  a.download = response.data.fileName; //File name Here
  a.click();
   
},
error=>{
toast("Error: Please try again");

}
);



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
            pin:this.state.pin,
            salaryPerMonth:this.state.salaryPerMonth,
            ctc:this.state.ctc,
            superviser:this.state.superviser,
            reportee:this.state.reportee,
            joiningDate:this.state.joiningDate
          }
          }
          validate={this.validate} render={({ handleSubmit ,form}) => (
    <form onSubmit={handleSubmit} className="p-fluid">


   
<div class="card">

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
        <InputText  hidden value={this.state.dob} onChange={(e) => this.setState({dob: e.target.value})} />
        <InputText  hidden value={this.state.finalizedLevel} onChange={(e) => this.setState({finalizedLevel: e.target.value})} />
        <InputText  hidden value={this.state.degreeEndDate} onChange={(e) => this.setState({degreeEndDate: e.target.value})} />
        <InputText  hidden value={this.state.degreeStartDate} onChange={(e) => this.setState({degreeStartDate: e.target.value})} />
        <InputText  hidden value={this.state.jobStartDate} onChange={(e) => this.setState({jobStartDate: e.target.value})} />
        <InputText  hidden value={this.state.jobEndDate} onChange={(e) => this.setState({jobEndDate: e.target.value})} />
        
        <InputText  hidden value={this.state.referalUserId} onChange={(e) => this.setState({referalUserId: e.target.value})} />
        <InputText  hidden value={this.state.referalCompany} onChange={(e) => this.setState({referalCompany: e.target.value})} />
        <InputText  hidden value={this.state.referalEmail} onChange={(e) => this.setState({referalEmail: e.target.value})} />
        <InputText  hidden value={this.state.referalType} onChange={(e) => this.setState({referalType: e.target.value})} />
        <InputText  hidden value={this.state.referalContact} onChange={(e) => this.setState({referalContact: e.target.value})} />
        <InputText  hidden value={this.state.referalAddr} onChange={(e) => this.setState({referalAddr: e.target.value})} />
        <InputText  hidden value={this.state.parentUserId} onChange={(e) => this.setState({parentUserId: e.target.value})} />
        <InputText  hidden value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} />
        <InputText  hidden value={this.state.city} onChange={(e) => this.setState({city: e.target.value})} />
        <InputText  hidden value={this.state.state} onChange={(e) => this.setState({state: e.target.value})} />
        <InputText  hidden value={this.state.pin} onChange={(e) => this.setState({pin: e.target.value})} />
        
        {this.state.blockedPanel && <ProgressSpinner/>}
<div class="field grid" hidden={(this.state.appStatus != 'C' && authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY")) || this.state.appStatus == 'Y' || this.state.appStatus == 'N'}>

    <label for="file" class="col-12 mb-2 md:col-2 md:mb-0">File </label>
       <div class="col-12 md:col-10">
       <FileUpload name="demo"  maxFileSize={1000000}  
       mode="basic"
       customUpload 
       ref={(el) => this.fileUploaderRef = el}
       uploadHandler={this.myUploader} 
       />
       
      </div>
  </div>
  <div class="field grid" hidden={(this.state.appStatus != 'C' && authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY")) || this.state.appStatus == 'Y' || this.state.appStatus == 'N'}>
    <label for="fileType" class="col-12 mb-2 md:col-2 md:mb-0">File Type </label>
       <div class="col-12 md:col-10">
      
       <Dropdown id="fileType" options={this.state.fileTyps}  value={this.state.fileType} onChange={(e) => this.setState({fileType:e.value})}
       placeholder="Select File type"/>
    </div>
  </div>


  <div class="field grid"  hidden={!(this.state.appStatus == 'R' && authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE"))}>
        <label for="salaryPerMonth" class="col-12 mb-2 md:col-2 md:mb-0">Salary Per Month</label>
        <div class="col-12 md:col-10">
            
            <Field name="salaryPerMonth" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="salaryPerMonth" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="salaryPerMonth" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Salary Per Month</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid"  hidden={!(this.state.appStatus == 'R' && authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE"))}>
        <label for="ctc" class="col-12 mb-2 md:col-2 md:mb-0">CTC</label>
        <div class="col-12 md:col-10">
            
            <Field name="ctc" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="ctc" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="ctc" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>CTC</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid"  hidden={!(this.state.appStatus == 'R' && authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE"))}>
        <label for="superviser" class="col-12 mb-2 md:col-2 md:mb-0">Superviser Name</label>
        <div class="col-12 md:col-10">
            
            <Field name="superviser" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="superviser" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="superviser" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Superviser Name</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid"  hidden={!(this.state.appStatus == 'R' && authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE"))}>
        <label for="reportee" class="col-12 mb-2 md:col-2 md:mb-0">Reportee Name</label>
        <div class="col-12 md:col-10">
            
            <Field name="reportee" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="reportee" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="reportee" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Reportee Name</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid" hidden={!(this.state.appStatus == 'R' && authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE"))}>
        <label for="joiningDate" class="col-12 mb-2 md:col-2 md:mb-0">Joining Date</label>
        <div class="col-12 md:col-6">
        <Field name="joiningDate" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Calendar id="joiningDate" showIcon={true} monthNavigator yearNavigator yearRange='2022:2300'
                    minDate={new Date()}  dateFormat="mm/dd/yy" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="joiningDate" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Joining Date</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
        )} />
        </div>
  </div>

  <div class="field grid">
       <div class="col-3 md:col-3 col-offset-8">
        <Button label="Send To Candidate" type='submit' onClick={() => {
                form.change("saveType", "C")
                form.change("finalizedLevel", "2")
              }} icon="pi pi-user" className="p-button-raised p-button-rounded" hidden={authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY") || this.state.appStatus == 'C' || this.state.appStatus == 'R' || this.state.appStatus == 'N' || this.state.appStatus == 'Y' }/>
        &nbsp; &nbsp; 
        <Button label="Send To Reviewer" type='submit' onClick={() => {
                form.change("saveType", "R");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded" hidden={authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY") || !(this.state.appStatus == 'F')} /> 
         &nbsp; &nbsp;
         <Button label="Send For Review" type='submit' onClick={() => {
                form.change("saveType", "F");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded" disabled={ !authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY")} hidden={this.state.appStatus != 'C'} /> 
         &nbsp; &nbsp;
         <Button label="Generate & send Offer Letter" type='submit' onClick={() => {
                form.change("saveType", "Y");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded"  hidden={!(authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE") && this.state.appStatus == 'R')} /> 
         &nbsp; &nbsp;
         <Button label="Reject" type='submit' onClick={() => {
                form.change("saveType", "N");
              }} icon="pi pi-user" className="p-button-raised p-button-rounded"  hidden={!(authService.getCurrentUser().permissions.includes("REVIEW_CANDIDATE") && this.state.appStatus == 'R')} />
        &nbsp; &nbsp; 
        <Button label="Reset" icon="pi pi-user" className="p-button-raised p-button-rounded"
        hidden={authService.getCurrentUser().permissions.includes("CANDIDATE_ENTRY")}/>
      </div>
        
    </div>

</div>


<Panel header="View Files" >
              <div className="card">
                  <DataTable value={this.state.files}
                   responsiveLayout="scroll" paginator rows={2} rowsPerPageOptions={[2,4,6]}>
                      
                      <Column field="fileName" header="File Name"></Column>
                      <Column field="fileType" header="File Type"></Column>
                      <Column  body={this.editRow.bind(this)} header="Download"></Column>

                      
                  </DataTable>
              </div>
          </Panel>
            
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

export default withRouter(CandidateDocumentUploadComponent);


