import axios from 'axios';

function getAll() {
    return axios.get("http://127.0.0.1:3000/event", {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token")
        }
    })
}

function getById(id) {
    return axios.get("http://127.0.0.1:3000/event" + id, {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token")
        }
    })
}

export default {
    getAll,
    getById
}