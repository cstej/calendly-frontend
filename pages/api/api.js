import axios from "axios";
import { getCookie } from "cookies-next";

let token;

export const baseURL = "http://localhost:8000/api";
export const clientUrl = "http://localhost:3000/";

export const Imageapi = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    token: token ? token : getCookie("authToken"),
    "Content-Type": "multipart/formdata",
  },
});

const api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    token: token ? token : getCookie("authToken"),
    "Content-Type": "application/json",
  },
});

export default api;
