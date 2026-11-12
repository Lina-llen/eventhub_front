import axios from "axios";
import { API_URL } from "./url";

function getMe(){
    return axios.get(API_URL + "users/me");
}

function updateMe(user){
    return axios.patch(API_URL + "users/me", user);
}

function resetPassword(changePassword){
    return axios.patch(API_URL + "users/resetPassword", changePassword);
}


export default {
    getMe,
    updateMe,
    resetPassword
}