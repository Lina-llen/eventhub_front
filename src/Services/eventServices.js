import axios from 'axios';

function getAll(){
    return axios.get("http://127.0.0.7.3000/event")
}

export default {
    getAll
}