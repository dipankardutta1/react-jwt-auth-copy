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

 class CreateOrgComponent extends React.Component {

  constructor(props) {
    super(props);
  
  
   this.save=this.save.bind(this);
  
   
   this.state = {
    loading:false,
    showContent: false 
    };
   
    this.industryTypes = [ 'IT','Finance'];
     
     
  }//end


  componentDidMount() { // New Method added By Dipankar

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
       
        //alert(JSON.stringify(response.data.output));
        this.setState({
          userId:response.data.output.userId,
          name:response.data.output.name,
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

  const user = authService.getCurrentUser();

  this.setState({
    parentUserId : user.userId 
  });
    

    if(this.state.userId){

      authService.saveUser(JSON.stringify(this.state)).then(response => {
    
        if (response.data.user.userId) {
          userService.saveUser(this.state).then(response => {
        
            if (response.data.output) {
              //alert(response.data.output.userId);
              
              alert("User Updated");
            }else{
             // return null
             alert("User Not created:email or username is already exist");
            }
        });

        }else{
          alert("User Not Updated:email or username is already exist");
        }
      }).catch(error => {
        alert("User Not Updated:email or username is already exist");
        //return null;
      });

    }else{
     // alert("create " + JSON.stringify(this.state));


      authService.saveUser(JSON.stringify(this.state)).then(response => {
    
        if (response.data.user.userId) {

          this.setState({
            userId : response.data.user.userId
          });

          
         userService.saveUser(this.state).then(response => {
        
          if (response.data.output) {
            //alert(response.data.output.userId);
            
            alert("User Created");
          }else{
           // return null
           alert("User Not created:email or username is already exist");
          }
        });

        }else{
          alert("User Not created:email or username is already exist");
        }
      }).catch(error => {
        alert("User Not created:email or username is already exist");
        //return null;
      });
    }
    

}


  render() {
    if(this.state.loading){
      return (
        <div>
          <h3>Loading, Please Wait ....</h3>
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
        <Panel header="Create Organization" >
    <div class="grid">
    <div class="col-11">
    <Panel header="Enter Details">
    <div class="card">
    <div class="field grid">
        <label for="organizationName" class="col-12 mb-2 md:col-2 md:mb-0">Organization Name</label>
        <div class="col-12 md:col-10">
        <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
        <InputText  hidden value={this.state.parentUserId} onChange={(e) => this.setState({parentUserId: e.target.value})} />
        
        <InputText value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
        </div>
    </div>
    <div class="field grid">
        <label for="organizationEmail" class="col-12 mb-2 md:col-2 md:mb-0">Organization Email</label>
        <div class="col-12 md:col-10">
        <InputText value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        </div>
    </div>
    <div class="field grid">
        <label for="organizationWebsite" class="col-12 mb-2 md:col-2 md:mb-0">Organization Website</label>
        <div class="col-12 md:col-10">
        <InputText value={this.state.organizationUrl} onChange={(e) => this.setState({organizationUrl: e.target.value})} />
        </div>
    </div><div class="field grid">
        <label for="sizeOfEmployee" class="col-12 mb-2 md:col-2 md:mb-0">Size of Employee</label>
        <div class="col-12 md:col-10">
        <InputText value={this.state.sizeOfEmployees} onChange={(e) => this.setState({sizeOfEmployees: e.target.value})} />
        </div>
    </div>
    <div class="field grid">
        <label for="location" class="col-12 mb-2 md:col-2 md:mb-0">Location</label>
        <div class="col-12 md:col-10">
          <InputText value={this.state.location} onChange={(e) => this.setState({location: e.target.value})} />
         </div>
    </div>
    
    <div class="field grid">
        <label for="industryType" class="col-12 mb-2 md:col-2 md:mb-0">Industry Type</label>
        <div class="col-12 md:col-2">
        <Dropdown value={this.state.organizationType} options={this.industryTypes}  onChange={(e) => this.setState({organizationType: e.target.value})} placeholder="Please select Industry Type" />
        </div>
    </div>
    <div class="field grid">
        <label for="tagLine" class="col-12 mb-2 md:col-2 md:mb-0">Tag Line</label>
        <div class="col-12 md:col-10">
        <InputText value={this.state.tagLine} onChange={(e) => this.setState({tagLine: e.target.value})} />
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


