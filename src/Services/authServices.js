import axios from "axios";


function login(user){
    return axios.post("http://127.0.0.1:3000/auth/login", user)
}


function register(user){
    return axios.post("http://127.0.0.1:3000/auth/register", user)
}

function isConnected(){
    const token = window.localStorage.getItem("token");
    if(token){
        return true;
    }
    else{
        return false;
    }
}


export default {
    login,
    register,
    isConnected
};