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
import { Checkbox } from 'primereact/checkbox';
import authService from '../../services/auth.service';
import UserService from '../../services/user.service';
import { Toast } from 'primereact/toast';
import userService from '../../services/user.service';

import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
// Importing toastify module
import {toast} from 'react-toastify';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

 class UserCreateComponent extends React.Component {

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
    selectedRoles:['ROLE_USER']
    };
   
   
   
    this.desiganationTypes = ['HR','Accountant','User','Admin','Reviewer'];
    //this.onCategoryChange = this.onCategoryChange.bind(this);
  
  }//end
 

  validate = (data) => {
    let errors = {};
    if (!data.name) {
        errors.name = 'Name is required.';
    }

    if (!data.email) {
      errors.email = 'Email is required.';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
    }
    if (!data.contactNumber) {
      errors.contactNumber = 'Contact Number is required.';
    }else if(isNaN(data.contactNumber)){
      errors.contactNumber = 'Contact Number  is not valid.';
    }
    if (!data.location) {
      errors.location = 'Location is required.';
    }
    if (!data.desiganationType) {
      errors.desiganationType = 'Tag Line is required.';
    }


    return errors;
  };


  onSubmit = (data, form) => {
    if(form){
      
      
      
        this.setState({
          finalizedLevel:data.finalizedLevel ? data.finalizedLevel : "1", 
          name:data.name,
          email:data.email,
          contactNumber:data.contactNumber,
          location:data.location,
          desiganationType:data.desiganationType
         
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

    //alert(user && user.permissions.includes("CREATE_USER") && !(email));

    if (user && user.permissions.includes("CREATE_USER") && !(userId)) {
     
      this.setState({
        loading:false,
        showContent: true,
        parentUserId : user.userId 
      });

       
       
    }else if(user && user.permissions.includes("EDIT_USER") && userId){

     

      this.setState({
        loading:true,
        showContent: false,
        parentUserId : user.userId 
      });

      userService.findByUserId(userId).then(response => {
       
        //alert(JSON.stringify(response.data.output));
        this.setState({
          userId:response.data.output.userId,
          name:response.data.output.name,
          finalizedLevel:response.data.output.finalizedLevel,
          email:response.data.output.email,
          contactNumber:response.data.output.contactNumber,
          location:response.data.output.location,
          desiganationType:response.data.output.desiganationType,
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
                    toast("User Updated");
      
                    //alert("User Updated");
                  }else{
                    this.setState({
                      blockedPanel:false
                    });
                   // return null
                   toast("User Not created");
                   //alert("User Not created:email or username is already exist");
                  }
              });
      
              }else{
                this.setState({
                  blockedPanel:false
                });
                toast("User Not Updated");
                //alert("User Not Updated:email or username is already exist");
              }
            }).catch(error => {
              this.setState({
                blockedPanel:false
              });
              toast("User Not Updated");
              //alert("User Not Updated:email or username is already exist");
              //return null;
            });
      
          }else{
           // alert("create " + JSON.stringify(this.state));
      
      
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
                  toast("User  created");
                  //alert("User Created");
                }else{
                 // return null
                 this.setState({
                  blockedPanel:false
                });
                 toast("User Not created:email or username is already exist");
                // alert("User Not created:email or username is already exist");
                }
              });
      
              }else{
                this.setState({
                  blockedPanel:false
                });
                alert("User Not created:email or username is already exist");
              }
            }).catch(error => {
              this.setState({
                blockedPanel:false
              });
              alert("User Not created:email or username is already exist");
              //return null;
            });
          }
          
      
      }



  render() {
    <Toast ref={(el) => this.toast = el} />
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
        
        <div class="grid">
        
        <div class="col-11">
        <Panel header="Enter Details">
        <Form onSubmit={this.onSubmit} initialValues={
          { userId:this.state.userId,
            parentUserId:this.state.parentUserId,
            finalizedLevel:this.state.finalizedLevel,
            name:this.state.name,
            email:this.state.email,
            contactNumber:this.state.contactNumber,
            location:this.state.location,
            desiganationType:this.state.desiganationType,
            }
          }
          validate={this.validate} render={({ handleSubmit,form ,submitting, pristine}) => (
          <form onSubmit={handleSubmit} className="p-fluid">
        <div class="card">
        <div class="field grid">
            <label for="name" class="col-12 mb-2 md:col-2 md:mb-0"> Name</label>
            <div class="col-12 md:col-10">
              <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
              <InputText  hidden value={this.state.parentUserId} onChange={(e) => this.setState({parentUserId: e.target.value})} />
              <InputText  hidden value={this.state.finalizedLevel} onChange={(e) => this.setState({finalizedLevel: e.target.value})} />
        
                <Field name="name" render={({ input, meta }) => (
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                            <label htmlFor="name" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Name</label>
                        </span>
                        {this.getFormErrorMessage(meta)}
                    </div>
                )} />
            </div>
        </div>
        {this.state.blockedPanel && <ProgressSpinner/>}

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
        </div>
        <div class="field grid">
            <label for="contactNumber" class="col-12 mb-2 md:col-2 md:mb-0">Contact Number</label>
            <div class="col-12 md:col-10">
                <Field name="contactNumber" render={({ input, meta }) => (
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="contactNumber" {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                            <label htmlFor="contactNumber" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Contact Number</label>
                        </span>
                        {this.getFormErrorMessage(meta)}
                    </div>
                )} />
            </div>
        </div><div class="field grid">
            <label for="location" class="col-12 mb-2 md:col-2 md:mb-0">Location</label>
            <div class="col-12 md:col-10">
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
            <label for="desiganationType" class="col-12 mb-2 md:col-2 md:mb-0">Desiganation</label>
            <div class="col-12 md:col-2">
            
            <Field name="desiganationType" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Dropdown id="desiganationType" options={this.desiganationTypes} {...input} autoFocus className={classNames({ 'p-invalid': this.isFormFieldValid(meta) })} />
                    <label htmlFor="desiganationType" className={classNames({ 'p-error': this.isFormFieldValid(meta) })}>Desiganation</label>
                </span>
                {this.getFormErrorMessage(meta)}
            </div>
          )} />
            </div>
        </div>
        
        

        
        <div class="field grid">
            <div class="col-3 md:col-3 col-offset-3">
            <Button label="save" icon="pi pi-user"  type="submit" className="p-button-raised p-button-rounded"/>
            &nbsp; &nbsp; 
            <Button label="Finalize & Send Email" onClick={() => {
                form.change("finalizedLevel", "2");
              }} icon="pi pi-user" type="submit" className="p-button-raised p-button-rounded"
              hidden={!(this.state.finalizedLevel == "1" && this.state.userId)}/>
              &nbsp;
              <Button label="Reset" type="button"
              onClick={() => {
                this.props.history.push("/createNewUser");
                window.location.reload();
            }} 
            icon="pi pi-user" className="p-button-raised p-button-rounded"/>
            </div>
        </div>
        
    </div>
    </form>
)}/>
        </Panel>
        </div>
    </div>
           
                    </BlockUI>
      </div>
    );
    }
  }
}

export default withRouter(UserCreateComponent);


