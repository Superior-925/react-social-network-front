import axios from "axios";
import {configDev} from "../environment/environment.dev"

class FriendsService {

    async findFriends(friendName, ignoreIds) {

        const response = await axios.get(`http://${configDev.hostPort}/friends/`, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`},
            params: {friendName: friendName, ids: ignoreIds}
        });
        return response;
    }

}

export default new FriendsService();
