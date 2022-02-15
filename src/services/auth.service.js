import axios from "axios";
import {UserDto} from '../model/userDto';
import authHeader from './auth-header';
import UserService from '../services/user.service';

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
          //'Authorization': 'Basic Y2xpZW50YXBwOnBhc3N3b3JkMTIz'   
        } ,
        auth: {
          username: 'clientapp',
          password: 'password123'
        }
      })
      .then(response => {
        
        if (response.data.access_token) {
          //alert("ok " + JSON.stringify(response.data));
          localStorage.setItem("user", JSON.stringify(response.data));
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

  getRoles() {
    return axios.post(API_URL + "/api/auth/getRoles");
    //return axios.get(RESOUCE_API_URL + '/api/auth/getRoles', { headers: authHeader() });
    

  }
  getRolesByUserName(userName) {
   
    return axios.get(API_URL + "/api/auth/findRoleByUserName/"+userName);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
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


}

export default new AuthService();