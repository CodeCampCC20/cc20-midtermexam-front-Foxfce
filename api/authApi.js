import axios from "axios";

const authApi = {}

const BASEURL = "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api"

authApi.register = (input) => {
  return axios.post(`${BASEURL}/V1/auth/register`)
}

authApi.login = (input) => {
  // console.log(input);
  // console.log(JSON.stringify(input));
  return axios.post(`${BASEURL}/V1/auth/login`,input)
}

authApi.getMe = (input) => {
  return axios.post(`${BASEURL}/V1/auth/21`)
}

export default authApi;