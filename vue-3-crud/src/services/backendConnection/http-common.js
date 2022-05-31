import axios from "axios";


export default  axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 1000,
  headers: {
    // 'Accept': 'application/vnd.GitHub.v3+json',
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  }
});





