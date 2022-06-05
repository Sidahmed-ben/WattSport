import axios from "axios";


export default  axios.create({
  baseURL: 'http://localhost:8082',
  timeout: 1000,
  withCredentials: true,
  headers: {}
});





