import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

function login(user) {
    return axios.post(`${API_URL}/auth/login`, user);
}

function register(user) {
    return axios.post(`${API_URL}/auth/register`, user);
}

export default {
    login,
    register
};