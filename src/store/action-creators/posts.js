import axios from "axios";
import {configDev} from "../../environment/environment.dev";

import {
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR,
    CHANGE_POST,
    CHANGE_POST_SUCCESS,
    CHANGE_POST_ERROR,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR
} from "../action-types/posts";

export const fetchPosts = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_POSTS})
            const response = await axios.get(`http://${configDev.hostPort}/post/`+userId, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });
            const postsArr = [];
            response.data.forEach((item) => {
                let date = new Date(item.updatedAt);
                let newDate = date.toLocaleString();
                postsArr.push({postText: item.postText, postAuthor: item.userId.nickname, postId: item._id, updatedAt: newDate});
            });
            postsArr.sort(function(a, b) {
                a = a.updatedAt;
                b = b.updatedAt;
                return a>b ? -1 : a<b ? 1 : 0;
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

export const addPost = (userId, postText) => {
    return async (dispatch) => {
        try {
            dispatch({type: CREATE_POST})

            const data = {userId: userId, post: postText};
            const response = await axios.post(`http://${configDev.hostPort}/post`, data, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });
            const date = new Date(response.data.updatedAt);
            const localDateFormat = date.toLocaleString();
            const userPost = {postText: response.data.postText, postAuthor: response.data.userId.nickname, postId: response.data._id, updatedAt: localDateFormat};

            //delay for simulating a request to a remote server
            setTimeout(() => {
                dispatch({type: CREATE_POST_SUCCESS, payload: userPost})
            }, 1000)
            return response
        } catch (e) {
            dispatch({
                type: CREATE_POST_ERROR,
                payload: 'An error occurred while creating post'
            })
        }
    }
}

export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            dispatch({type: DELETE_POST})

            const response = await axios.delete(`http://${configDev.hostPort}/post/`+postId, {
            headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });

            //delay for simulating a request to a remote server
            setTimeout(() => {
                dispatch({type: DELETE_POST_SUCCESS, payload: response.data._id})
            }, 1000)
            return response
        } catch (e) {
            dispatch({
                type: DELETE_POST_ERROR,
                payload: 'An error occurred while deleting post'
            })
        }
    }
}

export const changePost = (postText, postId) => {

    return async (dispatch) => {
        try {
            dispatch({type: CHANGE_POST})

            const data = {postText: postText, postId: postId};
            const response = await axios.patch(`http://${configDev.hostPort}/post`, data, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });

            //delay for simulating a request to a remote server
            setTimeout(() => {
                dispatch({type: CHANGE_POST_SUCCESS, payload: {id: response.data._id, postText: response.data.postText, updatedAt: response.data.updatedAt}})
            }, 1000)
            return response
        } catch (e) {
            dispatch({
                type: CHANGE_POST_ERROR,
                payload: 'An error occurred while changing post'
            })
        }
    }
}
