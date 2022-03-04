import axios from 'axios';
import authHeader from './auth-header';
import {UserDto} from '../model/userDto';
const API_URL = "http://localhost:9000/resource/user";

class UserService {
  
  constructor() {
    this.userDto =new UserDto();
    this.email='';
  }

  getPublicContent() {
    return axios.get(API_URL + '/resource/resource');
  }

  getUserBoard() {
    return axios.get(API_URL + '/resource/securedUser', { headers: authHeader() });
  }
  
  getAdminBoard() {
    return axios.get(API_URL + '/resource/securedAdmin', { headers: authHeader() });
  }

// add By Dipankar
  getAllUsers(){
    //return  axios.get(API_URL + '/findAll', { headers: authHeader() });

    return axios({
      url: API_URL + '/findAll',
      method: 'get', 
      headers: authHeader() 
  })
  .then(response => {
    
    if (response.data.output) {
      return response.data.output;
    }else{
      return [];
    }
  });
}
  saveUser(userDto){
    //return  axios.get(API_URL + '/findAll', { headers: authHeader() });
    const user = JSON.parse(localStorage.getItem('user'));
    //alert("in user service"+userDto);
    return axios({
      url: API_URL + '/saveUser',
      method: 'post', 
      data: userDto,
      headers:  authHeader() 
  });
  
}

findUserByEmail(email){
  //return  axios.get(API_URL + '/findAll', { headers: authHeader() });
  const user = JSON.parse(localStorage.getItem('user'));
  //alert("in user service"+userDto);
  return axios({
    url: API_URL + '/findByEmail/'+email,
    method: 'get', 
    headers: authHeader()
   
  });

}



findByUserId(userId){
 
  return axios({
    url: API_URL + '/findByUserId/'+userId,
    method: 'get', 
    headers: authHeader()
   
  });

}

findByParentUserIdAndUserType(parentUserId){
  return axios({
    url: API_URL + '/findByParentUserIdAndUserType/'+parentUserId,
    method: 'get', 
    headers: authHeader()
  });
}


findCandidateByParentUserId(parentUserId){
  return axios({
    url: API_URL + '/findCandidateByParentUserId/'+parentUserId,
    method: 'get', 
    headers: authHeader()
  });
}


toggleUserStatusByEmail(email){
  //return  axios.get(API_URL + '/findAll', { headers: authHeader() });
  //alert("in user service"+userDto);
  return axios({
    url: API_URL + '/activateOrInActivateUserByEmail/'+email,
    method: 'delete', 
    headers: authHeader() 
   
});

}





}

export default new UserService();