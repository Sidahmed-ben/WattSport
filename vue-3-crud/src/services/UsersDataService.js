import http from "./backendConnection/http-common";

class UsersDataService {
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

  // authenticate(){
  //   return http.get()
  // }
//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }
//   create(data) {
//     return http.post("/tutorials", data);
//   }
//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }
}


export default new UsersDataService();