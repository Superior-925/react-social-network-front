import axios from "axios";
import {configDev} from "../../environment/environment.dev";

import {
    FETCH_REQUESTS,
    FETCH_REQUESTS_SUCCESS,
    FETCH_REQUESTS_ERROR,
    ADD_REQUEST,
    ADD_REQUEST_SUCCESS,
    ADD_REQUEST_ERROR,
    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_ERROR
} from "../action-types/requests";
import {FETCH_POSTS, FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS} from "../action-types/posts";

export const fetchFriendsRequests = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_REQUESTS})
            const response = await axios.get(`http://${configDev.hostPort}/request/`+userId, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });
            const requestsArr = [];
            response.data.forEach((item) => {
                let date = new Date(item.updatedAt);
                let newDate = date.toLocaleString();
                requestsArr.push({postText: item.postText, postAuthor: item.userId.nickname, postId: item._id, updatedAt: newDate});
            });

            //delay for simulating a request to a remote server
            setTimeout(() => {
                dispatch({type: FETCH_POSTS_SUCCESS, payload: postsArr})
            }, 1000)
        } catch (e) {
            dispatch({
                type: FETCH_POSTS_ERROR,
                payload: 'An error occurred while loading posts'
            })
        }
    }
}