import axios from "axios";
import {configDev} from "../environment/environment.dev"
import {FETCH_AVATAR_ERROR} from "../store/action-types/avatar";

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

    async deleteFriendRequest(id) {

        const response = await axios.delete(`http://${configDev.hostPort}/request/`+id, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async addFriend(userId, candidateId, requestRecordId) {

        const data = {userId, candidateId, requestRecordId};

        const response = await axios.post(`http://${configDev.hostPort}/friend`, data, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async getFriends(id) {

        const response = await axios.get(`http://${configDev.hostPort}/friends/`+id, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }
}

export default new FriendsService();
