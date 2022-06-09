import axios from "axios";
import {configDev} from "../environment/environment.dev"

class FriendsService {

    async findFriends(friendName, ignoreIds) {

        const response = await axios.get(`http://${configDev.hostPort}/friend/search`, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`},
            params: {friendName: friendName, ids: ignoreIds}
        });
        return response;
    }

    async addFriendRequest(userId, candidateId) {

        const data = {userId: userId, candidateId: candidateId};

        const response = await axios.post(`http://${configDev.hostPort}/candidate`, data, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async getFriendRequests(userId) {

        const response = await axios.get(`http://${configDev.hostPort}/request/`+userId, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async deleteFriendRequest(userId, candidateId) {

        const response = await axios.delete(`http://${configDev.hostPort}/request/`, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`},
            params: {userId: userId, candidateId: candidateId}
        });
        return response;
    }

    async getCandidates(userId) {

        const response = await axios.get(`http://${configDev.hostPort}/candidate/`+userId, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

}

export default new FriendsService();
