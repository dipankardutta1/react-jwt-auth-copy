import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:9000/resource/user";

class UserService {
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

    
  })
  ;




  }


}

export default new UserService();