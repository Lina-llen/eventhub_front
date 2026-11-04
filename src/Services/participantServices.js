import axios from 'axios';
import { API_URL } from './url';

function insert(ev_id) {
    return axios.post(API_URL + "participants", { event: ev_id });
}

export default {
   insert
}