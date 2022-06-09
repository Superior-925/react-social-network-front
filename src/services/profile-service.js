import axios from "axios";
import {configDev} from "../environment/environment.dev"

class ProfileService {

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

    async changeNickname(userId, nickname) {

        const data = {userId: userId, nickname: nickname.nickname};

        const response = await axios.post(`http://${configDev.hostPort}/nickname`, data, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }
}

export default new ProfileService();
