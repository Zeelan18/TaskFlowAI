import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflowai-d7uz.onrender.com/api"
});

export default API;