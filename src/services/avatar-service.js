import axios from "axios";
import {configDev} from "../environment/environment.dev"

class AvatarService {

    async changeAvatar(userId, file) {

        const data = {userId: userId, file: file};

        const response = await axios.post(`http://${configDev.hostPort}/avatar`, data, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async getAvatar(userId) {

        const response = await axios.get(`http://${configDev.hostPort}/avatar/`+userId, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }
}

export default new AvatarService();
