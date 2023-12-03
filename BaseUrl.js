//
import axios from "axios";
// import socket from "./Socket"
const baseURL = process.env.BACKEND;

const Axios = axios.create({
  baseURL: process.env.BACKEND,

  withCredentials: true,
});

export { baseURL };

export default Axios;
