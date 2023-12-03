import axios from "axios";
import { getCookie } from "cookies-next";

let token;

export const baseURL = process.env.BACKEND;
export const clientUrl =process.env.FRONTEND;

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
