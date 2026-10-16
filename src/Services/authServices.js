import axios from 'axios';

function login(user) {
    return axios.post('http://127.0.0.1:3000/auth/login', user);
}

export default {
    login
}   