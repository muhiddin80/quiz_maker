import customAxios from "../config/axios.config.js";

export async function registerUser(payload) {
  return await customAxios.post("/auth/register", payload); 
}

export async function loginUser(payload) {
    return await customAxios.post("/auth/login",payload)
}

export async function checkToken() {
  return await customAxios.get("/auth/checkToken");
}

export async function getQuizes() {
    return await customAxios.get("/quizes")
}

export async function getCollection(){
    return await customAxios.get("/collection?limit=10&page=1")
}

export async function forgotPassword(payload) {
  return await customAxios.post('/auth/forgot_password',payload)
}

