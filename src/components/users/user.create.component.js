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

 class UserCreateComponent extends React.Component {

  constructor(props) {
    super(props);
    
    this.save=this.save.bind(this);
    this.reset=this.reset.bind(this);
   //this.onRolesChange=this.onRolesChange.bind(this);
   
   this.state = {
    showContent: false,
    desiganationType: null,
    roles:[],
    userId:'',
    name:'',
    email:'',
    contactNumber:'',
    location:'',
    checked: false,
    selectedRoles:[],
    loading : false
   
    };
   
    this.desiganationTypes = ['HR','Accountant','User','Admin','Reviewer'];
    this.onCategoryChange = this.onCategoryChange.bind(this);
  
  }//end


  componentDidMount() { // New Method added By Dipankar

    const user = authService.getCurrentUser();
    let email=localStorage.getItem('email');

    //alert(user && user.permissions.includes("CREATE_USER") && !(email));

    if (user && user.permissions.includes("CREATE_USER") && !(email)) {
     
      this.setState({
        showContent: true,
        desiganationType: null,
        roles:[],
        userId:'',
        name:'',
        email:'',
        contactNumber:'',
        location:'',
        checked:false,
        selectedRoles:[],
        loading : true
        });

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

       
    }else if(user && user.permissions.includes("EDIT_USER") && email){

     

      this.setState({
        showContent: true,
        desiganationType: null,
        roles:[],
        userId:'',
        name:'',
        email:'',
        contactNumber:'',
        location:'',
        checked:false,
        selectedRoles:[],
        loading : true
        });


        authService.getRoles().then((response) => {
          //alert(JSON.stringify(response.data));
          const rolesList=[];
          for(let i = 0; i < response.data.length; i++) {
            rolesList.push(response.data[i]);
          }
          
          this.setState({
            roles:[...rolesList]
          });
       },
       error => {
       }
     );

     
     if(email!=" "){
        UserService.findUserByEmail(email).then(response => {
       
          authService.getRolesByUserName(email).then(response => {
            var names = JSON.stringify(response.data.user.selectedRoles);
            names=names.replace(/['"]+/g,'');//remove double quotes
            names=names.replace(/[\])}[{(]/g, ''); //remove [] charecter 
            var nameArr = names.split(',');
       
            const rolesList=[];
            for(let i = 0; i <nameArr.length; i++) {
                  rolesList.push(nameArr[i]);
            }
          
            this.setState({
              selectedRoles:[...rolesList]
            });
          });
          this.setState({
            userId:response.data.output[0].userId,
            name:response.data.output[0].name,
            email:response.data.output[0].email,
            contactNumber:response.data.output[0].contactNumber,
            location:response.data.output[0].location,
            desiganationType:response.data.output[0].desiganationType,
            loading : false
          });
       
        });
      }
      localStorage.setItem("email","");
    }else{
      this.setState({
        showContent: false,
        desiganationType: null,
        roles:[],
        selectedRoles:[],
        userId:'',
        name:'',
        email:'',
        contactNumber:'',
        location:'',
        checked:false,
        loading : false
        });
    }
    
  }

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
 // this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
  
   authService.saveUser(JSON.stringify(this.state)).then(response => {
    
    if (response.data.user.userId) {
    
     let isSaved=null;
     
     isSaved= UserService.saveUser(response.data.user).then(response => {
    
      if (response.data.output!=null) {
        //alert(response.data.output.userId);
        
        alert("User Created / Updated");
      }else{
       // return null
       alert("User Not created:email or username is already exist");
      }
    });
     
    }else{
      alert("User Not created:email or username is already exist");
    }
  })
  .catch(error => {
    alert("User Not created:email or username is already exist");
    //return null;
});
    //userService.saveUser(JSON.stringify(this.state));
    //alert(JSON.stringify(this.state));
   
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
      
        
        
        <div class="grid">
        
        <div class="col-11">
        <Panel header="Enter Details">
        <div class="card">
        <div class="field grid">
            <label for="name" class="col-12 mb-2 md:col-2 md:mb-0"> Name</label>
            <div class="col-12 md:col-10">
                <InputText value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                <InputText  hidden value={this.state.userId} onChange={(e) => this.setState({userId: e.target.value})} />
            </div>
        </div>
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
        
        <div class="field grid">
            <label for="roles" class="col-12 mb-2 md:col-2 md:mb-0">Roles</label>
            <div class="col-12 md:col-10">
            <div class="grid">
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
                      
                      {
                        this.state.roles.map((category) => {
                            return (
                                <div key={category} className="field-checkbox">
                                    <Checkbox inputId={category} name="category" value={category} onChange={this.onCategoryChange} checked={this.state.selectedRoles.some((item) => item === category)}  />
                                    <label htmlFor={category}>{category}</label>&nbsp;&nbsp;
                                </div>
                            )
                        })
                    }
                      
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
            </div>
           </div>
        </div>
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
           
                    
      </div>
    );
    }
  }
}

export default withRouter(UserCreateComponent);


