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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

 class ViewOrgComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading:false,
      showContent:false,
      users:[]
      };


  }//end


  componentDidMount() { 
    
    const user = authService.getCurrentUser();

    this.state = {
      loading:false,
      showContent:false,
      users:[]
      };


    if (user && user.permissions.includes("VIEW_ORG")) {
      
      this.setState({
        loading:true,
        showContent:true,
        users:[]
      });

      userService.findByParentUserIdAndUserType(user.userId).then((response) => {
        
        this.setState({
          showContent: true,
          loading : false,
          users: response.data.output
        });

        //alert(response);
      },
      error => {
        this.setState({
          showContent: false,
          loading : false,
          users: []
        });
      }
    );





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
            <Panel header="View User" >
              <div className="card">
                  <DataTable value={this.state.users} 
                   responsiveLayout="scroll">
                      
                      <Column field="name" header="Name"></Column>
                      <Column field="email" header="Email"></Column>
                    
                     
                  </DataTable>
              </div>
          </Panel>
        </div>
  );
   }
}




}

export default withRouter(ViewOrgComponent);


