import axios from "axios";
// require('dotenv').config();
// import _ from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, });
instance.interceptors.response.use((response) => {
  const { data } = response;
  return response.data;
});
export default instance;
