import axios from 'axios';
import { API_URL } from './url';

function getAll() {
    return axios.get(API_URL + "event");
}

function getById(id) {
    return axios.get(API_URL + "event/" + id);
}

export default {
    getAll,
    getById
}