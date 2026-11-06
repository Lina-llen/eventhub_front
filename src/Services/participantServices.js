import axios from 'axios';
import { API_URL } from './url';

function insert(ev_id) {
    return axios.post(API_URL + "participants", { event: ev_id });
}

function deleteP(user_id, ev_id) {
    return axios.delete(API_URL + "participants/" + user_id + "/" + ev_id);
}

export default {
   insert,
   deleteP
}