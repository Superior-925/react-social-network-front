import axios from "axios";
import {configDev} from "../environment/environment.dev"

class AuthService {

    headers = {
        headers: {"Authorization" : `${localStorage.getItem("token")}`}
    };

    async signUp(data) {
        const response = await axios.post(`http://${configDev.hostPort}/signup`, {data
        });
        return response;
    }

    async logIn(data) {
        const response = await axios.post(`http://${configDev.hostPort}/login`, {data
        });
        return response;
    }

    async logOut() {
        const response = await axios.post(`http://${configDev.hostPort}/logout`, null, this.headers);
        return response;
    }

    setLocalStorageData(userId, userNickname, token, refresh) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("userNickname", userNickname);
        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refresh);
    }
}

export default new AuthService();
