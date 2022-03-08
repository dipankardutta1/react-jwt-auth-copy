import axios from "axios";
import {UserDto} from '../model/userDto';
import authHeader from './auth-header';
import userService from '../services/user.service';

const API_URL = "http://localhost:9999";
const RESOUCE_API_URL ="http://localhost:9000/oauth-resource";


class AuthService {

  constructor() {
    this.userDto =new UserDto();
    this.email="";
   // this.userService=new UserService();
  }

  login(username, password) {
    //alert(API_URL + '/oauth/token');
      return axios({
          url: API_URL + '/oauth/token',
          method: 'post', 
          params: { 'grant_type':'password','username':username,'password': password},
          headers: {
          'Content-Type':'application/x-www-form-urlencoded' 
          } ,
        auth: {
          username: 'clientapp',
          password: 'password123'
        }
      })
      .then(response => {
        
        if (response.data.access_token) {

          if(response.data.finalizedLevel == "3"){
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("userForReset", null);
          }else{
            localStorage.setItem("user", null);
            localStorage.setItem("userForReset", JSON.stringify(response.data));
          }

          

        }

        return response.data;
      })
      ;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/api/auth/signup", {
      username,
      email,
      password
    });
  }


  resetPassword(userId, currentPwd, password,repassword) {
    return axios.post(API_URL + "/api/auth/resetPassword", {
      userId,
      currentPwd,
      password,
      repassword
    });
  }



  getRoles() {
    return axios.post(API_URL + "/api/auth/getRoles");
    //return axios.get(RESOUCE_API_URL + '/api/auth/getRoles', { headers: authHeader() });
    

  }
  getRolesByUserName(userName) {
   
    return axios.get(API_URL + "/api/auth/findRoleByUserName/"+userName);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserForRestPwd() {
    return JSON.parse(localStorage.getItem('userForReset'));
  }

  saveUser(userDto){
    //return  axios.get(API_URL + '/findAll', { headers: authHeader() });
    

   // alert("in service auth"+userDto);
    return axios({
      url: API_URL + "/api/auth/saveUser",
      method: 'post', 
      data: userDto,
      headers: { 'content-type': 'application/JSON' },
  });
  
}

findUserByEmail(email){
  //return  axios.get(API_URL + '/findAll', { headers: authHeader() });

  alert("in service auth"+email);
  return axios({
    url: API_URL + "/api/auth/findByEmail/"+email,
    method: 'get', 
    headers: { 'content-type': 'application/JSON' },
});

}



manageRole(roleDto){
  
  return axios({
    url: API_URL + "/api/auth/manageRole",
    method: 'post', 
    data: roleDto,
    headers: { 'content-type': 'application/JSON' },
});

}


findRolesByparentUserId(parentUserId){
  
  return axios({
    url: API_URL + "/api/auth/findRolesByparentUserId/"+parentUserId,
    method: 'get', 
    headers: { 'content-type': 'application/JSON' },
});

}


getRolesByUserId(userId){
  
  return axios({
    url: API_URL + "/api/auth/getRolesByUserId/"+userId,
    method: 'get', 
    headers: { 'content-type': 'application/JSON' },
});

}

manageRoleForUser(userDto){
  
  return axios({
    url: API_URL + "/api/auth/manageRoleForUser",
    method: 'post', 
    data: userDto,
    headers: { 'content-type': 'application/JSON' },
});

}


}

export default new AuthService();