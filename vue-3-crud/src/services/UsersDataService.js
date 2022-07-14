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

  getUsersByLesson(sessionId){
    return http.post('/users/coach/seances/userParSeance', sessionId);
  }

  validateUserSession(user_session_Id){
    return http.post('/users/coach/seances/validateUser', user_session_Id);
  }

  inValidateUserSession(user_session_Id){
    return http.post('/users/coach/seances/invalidateUser', user_session_Id);
  }


  
  // Cette partie concerne le User
  registerUserSession(session){
    return http.post('/users/user/seances/register', session);
  }
  
  getUserValidSessionList(){
    return http.get('/users/user/seances/valides');
  }



}


export default new UsersDataService();