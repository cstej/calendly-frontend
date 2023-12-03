//
import axios from "axios";
// import socket from "./Socket"
const baseURL = "http://localhost:8000/";

const Axios = axios.create({
  baseURL: "http://localhost:8000/",

  withCredentials: true,
});

export { baseURL };

export default Axios;
