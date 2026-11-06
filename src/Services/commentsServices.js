import axios from "axios";
import { API_URL } from "./url";

function insert(comment) {
    return axios.post(API_URL + "comments", comment);
}

export default {
    insert
};
