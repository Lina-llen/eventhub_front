import axios from 'axios';
import { API_URL } from './url';

function getAll() {
    return axios.get(API_URL + "event");
}

function getById(id) {
    return axios.get(API_URL + "event/" + id);
}

function insert(event) {
    return axios.post(API_URL + "event", event);
}

export default {
    getAll,
    getById,
    insert
}