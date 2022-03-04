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
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

 class UserCreateComponent extends React.Component {

  constructor(props) {
    super(props);
    
    this.save=this.save.bind(this);
    this.reset=this.reset.bind(this);
   //this.onRolesChange=this.onRolesChange.bind(this);

   this.state = {
    blockedPanel:false,
    loading:false,
    showContent: false,
    selectedRoles:['ROLE_USER']
    };
   
   
   
    this.desiganationTypes = ['HR','Accountant','User','Admin','Reviewer'];
    //this.onCategoryChange = this.onCategoryChange.bind(this);
  
  }//end


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

        /*
        authService.getRoles().then((response) => {
            //alert(JSON.stringify(response.data));
            const rolesList=[];
            for(let i = 0; i < response.data.length; i++) {
              rolesList.push(response.data[i]);
            }
            
            this.setState({
              roles:[...rolesList],
              loading : false
            });
         },
         error => {
           alert("error" + error);
           this.setState({
            showContent:false,
            loading : false
          });
           
         }
       );
       */
       
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
/*
  onCategoryChange(e) {
    let selectedRoles = [...this.state.selectedRoles];

    if (e.checked) {
      selectedRoles.push(e.value);
    }
    else {
        for (let i = 0; i < selectedRoles.length; i++) {
            const selectedCategory = selectedRoles[i];

            if (selectedCategory === e.value) {
              selectedRoles.splice(i, 1);
                break;
            }
        }
    }

    this.setState({ selectedRoles });
}
*/
  
   /* onRolesChange = (e) => {
   
    let roles = [...this.state.roles];
    if (e.checked) {
      roles.push(e.value);
  }
  else {
   
      for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          if (role.key === e.value) {
            roles.splice(i, 1);
              break;
          }
      }
  }
  this.setState({
    selectedRoles:[...this.state.roles]
  });
        
      } */
    
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

reset(){
  this.setState({
    desiganationType: null,
    userId:'',
    name:'',
    email:'',
    contactNumber:'',
    location:'',
    checked: false,
    selectedRoles:[],
    });
    
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
        <div class="card">
        <div class="field grid">
            <label for="name" class="col-12 mb-2 md:col-2 md:mb-0"> Name</label>
            <div class="col-12 md:col-10">
              <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
              <InputText  hidden value={this.state.parentUserId} onChange={(e) => this.setState({parentUserId: e.target.value})} />

                <InputText value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                
            </div>
        </div>
        {this.state.blockedPanel && <ProgressSpinner/>}

        <div class="field grid">
            <label for="email" class="col-12 mb-2 md:col-2 md:mb-0">Email</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
            </div>
        </div>
        <div class="field grid">
            <label for="contactNumber" class="col-12 mb-2 md:col-2 md:mb-0">Contact Number</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.contactNumber} onChange={(e) => this.setState({contactNumber: e.target.value})} />
            </div>
        </div><div class="field grid">
            <label for="location" class="col-12 mb-2 md:col-2 md:mb-0">Location</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.location} onChange={(e) => this.setState({location: e.target.value})} />
            </div>
        </div>
        
        <div class="field grid">
            <label for="desiganation" class="col-12 mb-2 md:col-2 md:mb-0">Desiganation</label>
            <div class="col-12 md:col-2">
            <Dropdown id="desiganation" value={this.state.desiganationType} options={this.desiganationTypes} onChange={(e) => this.setState({desiganationType: e.target.value})} placeholder="Select Desiganation Type" />
            </div>
        </div>
        
        {/*
        <div class="field grid">
            <label for="roles" class="col-12 mb-2 md:col-2 md:mb-0">Roles</label>
            <div class="col-12 md:col-10">
            <div class="grid"> */}
            {/* {this.state.roles.map((object) => (    
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role1" name="role" value={object} onChange={this.onRolesChange} checked={this.state.roles.indexOf({object}) !== -1} />
                   <label htmlFor="role1">{object}</label>
            </div>
            </div>  
            ))} */}{/* {
            this.state.roles.map((role) => {
                            return (
                                <div  key={role.key} className="field-checkbox">
                                    <Checkbox inputId={role.key} name="role" value={role.name} onChange={this.onRolesChange} checked={this.state.roles.some((item) => item.key === role.key)}  />
                                    <label htmlFor={role.key}>{role.key}</label>
                                </div>
                            )
                        })
                      } */}
                      
                      {/*
                        this.state.roles.map((category) => {
                            return (
                                <div key={category} className="field-checkbox">
                                    <Checkbox inputId={category} name="category" value={category} onChange={this.onCategoryChange} checked={this.state.selectedRoles.some((item) => item === category)}  />
                                    <label htmlFor={category}>{category}</label>&nbsp;&nbsp;
                                </div>
                            )
                        })
                      */}
                      
                      {/*}
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role2" name="role" value="User" onChange={this.onRolesChange} checked={this.state.roles.indexOf('User') !== -1} />
                   <label htmlFor="role2">User</label>
             </div>
            </div>  
            <div class="col-4">
            <div className="field-checkbox">
                   <Checkbox inputId="role3" name="role" value="Reviewer" onChange={this.onRolesChange} checked={this.state.roles.indexOf('Reviewer') !== -1} />
                   <label htmlFor="role3">Reviewer</label>
             </div>
          </div>
            {*/}
            {/*
            </div>
           </div>
        </div>
            */}

        
        <div class="field grid">
            <div class="col-12 md:col-10 col-offset-6">
            <Button label="submit" icon="pi pi-user" onClick={this.save} className="p-button-raised p-button-rounded"/>
            &nbsp; &nbsp; 
            <Button label="Reset" icon="pi pi-user" onClick={this.reset}className="p-button-raised p-button-rounded"/>
           
            </div>
        </div>
        
    </div>
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


