import sendRequest from "./sendRequest";
import { jwtDecode } from "jwt-decode"; 


const url = "/users/"

export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}signup/`, "POST", formData)
        localStorage.setItem('token', response.access);
        return response.user
    } catch(err) {
        localStorage.removeItem('token');
        return null;
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}login/`, "POST", formData)
        localStorage.setItem('token', response.access);
        return response.user
    } catch (err) {
        localStorage.removeItem('token');
        return null;
    }
}

export  function logout() {
    localStorage.removeItem('token');
}

export function getUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const payload = jwtDecode(token);
  
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      }
  
      return {
        id: payload.user_id,
        username: payload.username,
        email: payload.email,
      };
    } catch (err) {
      localStorage.removeItem("token");
      return null;
    }
  }