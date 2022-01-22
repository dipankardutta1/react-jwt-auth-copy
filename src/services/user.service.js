import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:9000";

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
}

export default new UserService();