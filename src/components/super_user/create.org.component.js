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
//import { Formik, Field, Form, ErrorMessage } from 'formik';
//import * as Yup from 'yup';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

 class CreateOrgComponent extends React.Component {

  constructor(props) {
    super(props);
  
  
   this.save=this.save.bind(this);
   this.onSubmit=this.onSubmit.bind(this);
  
   this.validate=this.validate.bind(this);
   this.isFormFieldValid=this.isFormFieldValid.bind(this);
   this.getFormErrorMessage=this.getFormErrorMessage.bind(this);
  
   
   this.state = {
    blockedPanel:false,
    loading:false,
    showContent: false,
    selectedRoles:['ROLE_ADMIN']
    };
   
    this.industryTypes = [ 'IT','Finance'];
     
     
  }//end


  validate = (data) => {
    let errors = {};
    if (!data.name) {
        errors.name = 'Organization Name is required.';
    }
    if (!data.location) {
      errors.location = 'Location is required.';
  }
  if (!data.tagLine) {
    errors.tagLine = 'Tag Line is required.';
}
if (!data.organizationType) {
  errors.organizationType = ' Organization  Type is required.';
}
if (!data.organizationUrl) {
  errors.organizationUrl = 'Organization Url is required.';
}

if (!data.sizeOfEmployees) {
  errors.sizeOfEmployees = 'Size Of Employees  is required.';
}else if(isNaN(data.sizeOfEmployees)){
  errors.sizeOfEmployees = 'Size Of Employees  is not valid.';
}else if(parseInt(data.sizeOfEmployees)>10000000){
  errors.sizeOfEmployees = 'Size Of Employees  is not valid.';
}
if (!data.email) {
  errors.email = 'Email is required.';
}
else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
  errors.email = 'Invalid email address. E.g. example@email.com';
}

    return errors;
};

onSubmit = (data, form) => {
  if(form){
    
    
    
      this.setState({
        finalizedLevel:data.finalizedLevel ? data.finalizedLevel : "1", 
        name:data.name,
        email:data.email,
        organizationUrl:data.organizationUrl,
      location:data.location,
        sizeOfEmployees:data.sizeOfEmployees,
        organizationType:data.organizationType,
        tagLine:data.tagLine,
      
      },() => this.save());
   
    
  }
  
  
};

isFormFieldValid = (meta) => !!(meta.touched && meta.error);
getFormErrorMessage = (meta) => {
    return this.isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
};




  componentDidMount() { // New Method added By Dipankar
    this.state.blockedPanel=false;
    const user = authService.getCurrentUser();
    let userId=localStorage.getItem('userId');

    

    if (user && user.permissions.includes("CREATE_ORG") && !(userId)) {
      
      this.setState({
        loading:false,
        showContent: true,
        parentUserId : user.userId 
      });
    }else if(user && user.permissions.includes("EDIT_ORG") && userId){

      

      this.setState({
        loading:true,
        showContent: false,
        parentUserId : user.userId 
      });
      
      userService.findByUserId(userId).then(response => {
       
        this.setState({
          userId:response.data.output.userId,
          name:response.data.output.name,
          finalizedLevel:response.data.output.finalizedLevel,
          email:response.data.output.email,
          organizationUrl:response.data.output.organizationUrl,
         location:response.data.output.location,
          sizeOfEmployees:response.data.output.sizeOfEmployees,
          organizationType:response.data.output.organizationType,
          tagLine:response.data.output.tagLine,
          loading : false,
          showContent: true
        });
     
      });
    
      localStorage.setItem("userId","");
    }else{
      this.setState({
        loading:false,
        showContent: false
      });
    }

    
  }


save(){
  
 
  this.setState({
    blockedPanel:true
  });
  
  const user = authService.getCurrentUser();

  this.setState({
    parentUserId : user.userId 
  });
    
  
    if(this.state.userId){

      authService.saveUser(JSON.stringify(this.state)).then(response => {
        
        if (response.data.obj.userId) {
          userService.saveUser(this.state).then(response => {
        
            if (response.data.output) {
              //alert(response.data.output.userId);
              this.setState({
                blockedPanel:false
              });
              toast("Organization Updated");
              
            }else{
             // return null
             this.setState({
              blockedPanel:false
            });
             toast("Organization Not Updated:email or name is already exist");
            }
        });

        }else{
          this.setState({
            blockedPanel:false
          });
          toast("Organization Not Updated:email or name is already exist");
        }
      }).catch(error => {
        this.setState({
          blockedPanel:false
        });
        toast("Organization Not Updated:email or name is already exist");
        //return null;
      });

    }else{
      
      //alert("JSON" + JSON.stringify(this.state));

      authService.saveUser(JSON.stringify(this.state)).then(response => {
        
        if (response.data.obj.userId) {

          this.setState({
            userId : response.data.obj.userId
          });

          
         userService.saveUser(this.state).then(response => {
        
          if (response.data.output) {
            //alert(response.data.output.userId);
            this.setState({
              blockedPanel:false
            });
            toast("Organization Created");
          }else{
           // return null
           this.setState({
            blockedPanel:false
          });
           toast("Organization Not created:email or username is already exist");
          }
        }).catch(error => {
          this.setState({
            blockedPanel:false
          });
          toast("Organization Not created:email or username is already exist" +error);
          //return null;
        });;

        }else{
          this.setState({
            blockedPanel:false
          });
          toast("Organization Not created:email or username is already exist");
        }
      }).catch(error => {
        this.setState({
          blockedPanel:false
        });
        toast("Organization Not created:email or username is already exist");
        //return null;
      });
    }
    

}







  render() {
    if(this.state.loading){
      return (
        <div>
          <center><ProgressSpinner/></center>
        </div>
        );
    }else if(!this.state.showContent){
        return (
          <div>
            <h3>Not Authorized to access this page</h3>
          </div>
          );
      }else{  
     return (
      <div>
       
        <BlockUI blocked={this.state.blockedPanel}  fullScreen>
        
        <Panel header="Create Organization" >
        <Form onSubmit={this.onSubmit} initialValues={
          { userId:this.state.userId,
            parentUserId:this.state.parentUserId,
            finalizedLevel:this.state.finalizedLevel,
            name:this.state.name,email:this.state.email,
            location:this.state.location,
            organizationUrl:this.state.organizationUrl,
            sizeOfEmployees:this.state.sizeOfEmployees,
            organizationType:this.state.organizationType,
            tagLine:this.state.tagLine}
          }
          validate={this.validate} render={({ handleSubmit,form ,submitting, pristine}) => (
  <form onSubmit={handleSubmit} className="p-fluid">
    <div class="grid">
    <div class="col-11">
    <Panel header="Enter Details">
    <div class="card">
    <div class="field grid">
        <label for="organizationName" class="col-12 mb-2 md:col-2 md:mb-0">Organization Name</label>
        <div class="col-12 md:col-10">

        

        <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
        <InputText  hidden value={this.state.parentUserId} onChange={(e) => this.setState({parentUserId: e.target.value})} />
        <InputText  hidden value={this.state.finalizedLevel} onChange={(e) => this.setState({finalizedLevel: e.target.value})} />
        
        {/*
        <InputText value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
        */}
        <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Organization Name</label>
                                    </span>
                                    {this.getFormErrorMessage(meta)}
                                </div>
          )} />
        
        </div>
    </div>
    <div class="field grid">
        <label for="organizationEmail" class="col-12 mb-2 md:col-2 md:mb-0">Organization Email</label>
        <div class="col-12 md:col-10">
        {/*
        <InputText value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        */}

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
    </div>
    <div class="field grid">
        <label for="organizationWebsite" class="col-12 mb-2 md:col-2 md:mb-0">Organization Website</label>
        <div class="col-12 md:col-10">
          {/*
        <InputText value={this.state.organizationUrl} onChange={(e) => this.setState({organizationUrl: e.target.value})} />
          */}
          <Field name="organizationUrl" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="organizationUrl" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="organizationUrl" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Organization Url</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />

        </div>
    </div><div class="field grid">
        <label for="sizeOfEmployee" class="col-12 mb-2 md:col-2 md:mb-0">Size of Employee</label>
        <div class="col-12 md:col-10">
          {/*
        <InputText value={this.state.sizeOfEmployees} onChange={(e) => this.setState({sizeOfEmployees: e.target.value})} />
          */}
 {this.state.blockedPanel && <ProgressSpinner/>}
        <Field name="sizeOfEmployees" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="sizeOfEmployees" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="sizeOfEmployees" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Size Of Employees</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
        <label for="location" class="col-12 mb-2 md:col-2 md:mb-0">Location</label>
        <div class="col-12 md:col-10">
          {/*
          <InputText value={this.state.location} onChange={(e) => this.setState({location: e.target.value})} />
          */}
          <Field name="location" render={({ input, meta }) => (
              <div className="field">
                  <span className="p-float-label">
                      <InputText id="location" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                      <label htmlFor="location" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Location</label>
                  </span>
                  {this.getFormErrorMessage(meta)}
              </div>
          )} />
         
          </div>
    </div>
    
    <div class="field grid">
        <label for="industryType" class="col-12 mb-2 md:col-2 md:mb-0">Industry Type</label>
        <div class="col-12 md:col-2">
          {/*
        <Dropdown value={this.state.organizationType} options={this.industryTypes}  onChange={(e) => this.setState({organizationType: e.target.value})} placeholder="Please select Industry Type" />
          */}

          <Field name="organizationType" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Dropdown id="organizationType" options={this.industryTypes} {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="organizationType" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Organization Type</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />


        </div>
    </div>
    <div class="field grid">
        <label for="tagLine" class="col-12 mb-2 md:col-2 md:mb-0">Tag Line</label>
        <div class="col-12 md:col-10">
          {/*
        <InputText value={this.state.tagLine} onChange={(e) => this.setState({tagLine: e.target.value})} />
          */}

        <Field name="tagLine" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText id="tagLine" options={this.industryTypes} {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="tagLine" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Tag Line</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
        </div>
    </div>
    <div class="field grid">
        <div class="col-3 md:col-3 col-offset-3">
        <Button label="save" icon="pi pi-user"  type="submit" className="p-button-raised p-button-rounded"/>
        &nbsp;
        <Button label="Finalize & Send Email" onClick={() => {
                form.change("finalizedLevel", "2");
              }} icon="pi pi-user" type="submit" className="p-button-raised p-button-rounded"
              hidden={!(this.state.finalizedLevel == "1" && this.state.userId)}/>
        &nbsp;
        <Button label="Reset" type="button"
        onClick={() => {
          this.props.history.push("/createOrg");
          window.location.reload();
      }} 
      icon="pi pi-user" className="p-button-raised p-button-rounded"/>
       
        </div>
    </div>
    
</div>


    </Panel>
    </div>
</div>
</form>
)}/>
</Panel>
</BlockUI>
      </div>
    );

     }
  }
}

export default withRouter(CreateOrgComponent);


