import axios from "axios";
import {configDev} from "../../environment/environment.dev";
import {
        FETCH_AVATAR,
        FETCH_AVATAR_SUCCESS,
        FETCH_AVATAR_ERROR,
        CHANGE_AVATAR,
        CHANGE_AVATAR_SUCCESS,
        CHANGE_AVATAR_ERROR
        } from "../action-types/avatar";

export const fetchAvatar = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_AVATAR})

            const response = await axios.get(`http://${configDev.hostPort}/avatar/`+userId, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });

            setTimeout(() => {
                dispatch({type: FETCH_AVATAR_SUCCESS, payload: response.data})
            }, 1000)
            return response
        } catch (e) {
            dispatch({
                type: FETCH_AVATAR_ERROR,
                payload: 'An error occurred while loading the avatar'
            })
        }
    }
}

export const changeAvatar = (userId, file) => {

    return async (dispatch) => {
        try {
            dispatch({type: CHANGE_AVATAR})

            const data = {userId: userId, file: file};

            const response = await axios.post(`http://${configDev.hostPort}/avatar`, data, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });

            setTimeout(() => {
                dispatch({type: CHANGE_AVATAR_SUCCESS, payload: response.data})
            }, 1000)
            return response
        } catch (e) {
            dispatch({
                type: CHANGE_AVATAR_ERROR,
                payload: 'An error occurred while changing the avatar'
            })
        }
    }
}
