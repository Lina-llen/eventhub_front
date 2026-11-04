import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "./url";

function login(user){
    return axios.post(API_URL + "auth/login", user)
}


function register(user){
    return axios.post(API_URL + "auth/register", user)
}

function isConnected(){
    const token = window.localStorage.getItem("token");
    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded);
        if(decoded.exp * 1000 > Date.now()){
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            return true;
        }
        return false;
    }
    return false;
}


export default {
    login,
    register,
    isConnected
};