import http from "./backendConnection/http-common";

class UsersDataService {

  //  Cette partie concerne les deux utilisateurs (User,Coach)
  registerUser(data) {
    return http.post("/users/register", data);
  }

  loginUser(data) {
    return http.post("/users/login",data);
  }

  checkUserHomeAutho() {
    return http.get("/users/dashboard");
  }
  logoutUser(){
    return http.get('/users/logout');
  }

  // Cette partie concerne le Coach
  getCoachSessionList(){
    return http.get('/coach/senaces');
  }
  




  // Cette partie concerne le User
}


export default new UsersDataService();