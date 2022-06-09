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
            console.log(nickname);

            dispatch({type: CHANGE_NICKNAME})

            const data = {userId: userId, nickname: nickname};

            const response = await axios.post(`http://${configDev.hostPort}/nickname`, data, {
                headers: {"Authorization" : `${localStorage.getItem("token")}`}
            });
            setTimeout(() => {
                dispatch({type: CHANGE_NICKNAME_SUCCESS, payload: response.data})
            }, 1000)
            return response
        } catch (e) {
            dispatch({
                type: CHANGE_NICKNAME_ERROR,
                payload: 'An error occurred while changing the nickname'
            })
        }
    }
}
