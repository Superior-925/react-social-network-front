import axios from "axios";
import {configDev} from "../environment/environment.dev"

class PostService {

    async createPost(userId, postText) {

        const data = {userId: userId, ...postText};

        const response = await axios.post(`http://${configDev.hostPort}/post`, data, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async getPosts(userId) {

        const response = await axios.get(`http://${configDev.hostPort}/post/`+userId, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async deletePost(postId) {

        const response = await axios.delete(`http://${configDev.hostPort}/post/`+postId, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

    async changePost(postText, postId) {

        const data = {postText: postText, postId: postId};

        const response = await axios.patch(`http://${configDev.hostPort}/post`, data, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
        });
        return response;
    }

}

export default new PostService();
