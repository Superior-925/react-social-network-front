import axios from "axios";
import {configDev} from "../environment/environment.dev"

class PostService {

    headers = {
        headers: {"Authorization" : `${localStorage.getItem("token")}`}
    };

    async createPost(data) {
        const response = await axios.post(`http://${configDev.hostPort}/post`, data, this.headers);
        return response;
    }
}

export default new PostService();