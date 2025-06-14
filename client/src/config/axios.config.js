import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:4000/api", 
  timeout: 10000,
});

export default customAxios;
