import axios from "axios";
import {configDev} from "../../environment/environment.dev";
import {
    SET_NICKNAME,
    SET_NICKNAME_ERROR,
    CHANGE_NICKNAME,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_ERROR,
    FETCH_NICKNAME,
    FETCH_NICKNAME_SUCCESS,
    FETCH_NICKNAME_ERROR
} from "../action-types/profile";
import {
    CHANGE_POST_AUTHOR,
    CHANGE_POST_AUTHOR_SUCCESS,
    CHANGE_POST_AUTHOR_ERROR
} from "../action-types/posts";

export const fetchNickname = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_NICKNAME})
            const response = await axios.get(`http://${configDev.hostPort}/nickname/`+userId, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });
            dispatch({type: FETCH_NICKNAME_SUCCESS, payload: response.data.nickname})
        } catch (e) {
            dispatch({
                type: FETCH_NICKNAME_ERROR,
                payload: 'An error occurred while loading nickname'
            })
        }
    }
}

export const setNickname = (nickname) => {
    return async (dispatch) => {
        try {
            dispatch({type: SET_NICKNAME, payload: nickname})
        } catch (e) {
            dispatch({
                type: SET_NICKNAME_ERROR,
                payload: 'An error occurred while setting nickname'
            })
        }
    }
}

export const changeNickname = (userId, nickname) => {

    return async (dispatch) => {
        try {
            dispatch({type: CHANGE_NICKNAME});
            dispatch({type: CHANGE_POST_AUTHOR});

            const data = {userId: userId, nickname: nickname};
            const response = await axios.post(`http://${configDev.hostPort}/nickname`, data, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });
            setTimeout(() => {
                dispatch({type: CHANGE_NICKNAME_SUCCESS, payload: response.data})
                dispatch({type: CHANGE_POST_AUTHOR_SUCCESS, payload: response.data})
            }, 1000)
            return response
        } catch (error) {
            if (error.response.status === 406) {
                return setTimeout(() => {
                    dispatch({
                        type: CHANGE_NICKNAME_ERROR,
                        payload: error.response.data.message
                    })
                }, 1000)
            }
            dispatch({
                type: CHANGE_NICKNAME_ERROR,
                payload: 'An error occurred while changing the nickname'
            });
            dispatch({
                type: CHANGE_POST_AUTHOR_ERROR,
                payload: 'An error occurred while changing author of the posts'
            });
        }
    }
}
