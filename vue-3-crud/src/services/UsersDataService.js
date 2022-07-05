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
    return http.get('/users/coach/seances');
  }

  deleteCoachSessionId(deletedSessionId){
    return http.post('/users/coach/seances/deleteId',deletedSessionId)
  }
  
  addCoachSession(newSession){
    return http.post('/users/coach/seances/addSession', newSession);
  }

  editCoachSession(editedSession){
    return http.post('/users/coach/seances/editSession', editedSession);
  }




  // Cette partie concerne le User
}


export default new UsersDataService();