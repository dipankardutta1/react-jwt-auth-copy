import axios from "axios";

const API_URL = "http://localhost:9999";


class AuthService {
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
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();