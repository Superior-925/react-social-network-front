import axios from "axios";
import {configDev} from "../environment/environment.dev"

class AuthService {

    timerToken;

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

    async refresh(token) {
        const data = {refreshToken: token}

        const response = await axios.post(`http://${configDev.hostPort}/refresh`, data
        );
        return response;
    }

    async logOut() {
        const response = await axios.post(`http://${configDev.hostPort}/logout`, null, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    setLocalStorageData(userId, token, refresh) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refresh);
    }

    setLocalStorageTokens(token, refresh) {
        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refresh);
    }

    startRefresh() {
        this.timerToken = setInterval(() => {
            this.refresh(localStorage.getItem('refresh')).then((response) => {
                this.setLocalStorageTokens(response.data.token, response.data.refresh.token);
            })
        }, 100000);
    }

    stopRefresh() {
        clearTimeout(this.timerToken)
    }

}

export default new AuthService();
