import axios from "axios";

const todoListApi ={}

//token is eyJhbGciOiJIUzM4NCJ9.eyJ1c2VybmFtZSI6InRvZG9fdXNlcjIxIiwiYXV0aG9yaXR5IjoiUk9MRV9VU0VSIiwiaXNzIjoiVG9kbyBBUEkiLCJpYXQiOjE3NDkxMDIxOTgsImV4cCI6MTc0OTE4ODU5OH0.BqFrOmS2_qXceOjo0H1UXYOVZVN81L31rWTfAdsyiteOhwS5lq1yqRtrvmAXEqAw
// it keep in keepToken zustand

// {headers: {Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VybmFtZSI6InRvZG9fdXNlcjIxIiwiYXV0aG9yaXR5IjoiUk9MRV9VU0VSIiwiaXNzIjoiVG9kbyBBUEkiLCJpYXQiOjE3NDkxMTU5MTUsImV4cCI6MTc0OTIwMjMxNX0.C-NN0M9RxWrdw7UJOwruyaH0mqK9SWv9bVlSLwOGbj-zOi2p9A9Li86N-jcOUsaM"}}

const BASEURL = "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api"

todoListApi.createTodoList = (input,token) =>{
  return axios.post(`${BASEURL}/V2/todos`,input,{headers: {Authorization: `Bearer ${token}`}})
}

todoListApi.getAllTodoListByToken = (token) =>{
  // console.log(token);
return axios.get(`${BASEURL}/V2/todos`,{headers: {Authorization: `Bearer ${token}`}})
}

todoListApi.deleteTodoList = (input,todoId,token)=>{
  return axios.delete(`${BASEURL}/V2/todos/${todoId}`,input,{headers: {Authorization: `Bearer ${token}`}})
}

todoListApi.updateTodoList = (input,todoId,token)=>{
  return axios.patch(`${BASEURL}/V2/todos/${todoId}`,input,{headers: {Authorization: `Bearer ${token}`}})
}

export default todoListApi;

