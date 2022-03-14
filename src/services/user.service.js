import axios from 'axios';
import authHeader from './auth-header';
import {UserDto} from '../model/userDto';
const API_URL = "http://localhost:9000/resource";

class UserService {
  
  constructor() {
    this.userDto =new UserDto();
    this.email='';
  }

  getPublicContent() {
    return axios.get(API_URL + '/resource');
  }

  getUserBoard() {
    return axios.get(API_URL + '/securedUser', { headers: authHeader() });
  }
  
  getAdminBoard() {
    return axios.get(API_URL + '/user/resource/securedAdmin', { headers: authHeader() });
  }

// add By Dipankar
  getAllUsers(){
    //return  axios.get(API_URL + '/findAll', { headers: authHeader() });

    return axios({
      url: API_URL + '/user/findAll',
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
      url: API_URL + '/user/saveUser',
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
    url: API_URL + '/user/findByEmail/'+email,
    method: 'get', 
    headers: authHeader()
   
  });

}



findByUserId(userId){
 
  return axios({
    url: API_URL + '/user/findByUserId/'+userId,
    method: 'get', 
    headers: authHeader()
   
  });

}

findByParentUserIdAndUserType(parentUserId){
  return axios({
    url: API_URL + '/user/findByParentUserIdAndUserType/'+parentUserId,
    method: 'get', 
    headers: authHeader()
  });
}


findCandidateByParentUserId(parentUserId){
  return axios({
    url: API_URL + '/user/findCandidateByParentUserId/'+parentUserId,
    method: 'get', 
    headers: authHeader()
  });
}

findCandidateByLink(link){
  return axios({
    url: API_URL + '/findCandidateByLink/'+link,
    method: 'get'
  });
}


toggleUserStatusByEmail(email){
  //return  axios.get(API_URL + '/findAll', { headers: authHeader() });
  //alert("in user service"+userDto);
  return axios({
    url: API_URL + '/user/activateOrInActivateUserByEmail/'+email,
    method: 'delete', 
    headers: authHeader() 
   
});

}


saveCandidate(userDto){
  
  return axios({
    url: API_URL + '/saveCandidate',
    method: 'post', 
    data: userDto
});

}


updateFinalizedLevel(userId,finalizedLevel){
  
  return axios({
    url: API_URL + '/updateFinalizedLevel',
    method: 'post', 
    data: {userId,finalizedLevel}
});

}



findDocumentsByUserId(userId){
  return axios({
    url: API_URL + '/user/findDocumentsByUserId/'+userId,
    method: 'get', 
    headers: authHeader() 
   
  });
}


}

export default new UserService();