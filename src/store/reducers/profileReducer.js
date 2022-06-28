import {
    SET_NICKNAME,
    SET_NICKNAME_ERROR,
    FETCH_NICKNAME,
    FETCH_NICKNAME_SUCCESS,
    FETCH_NICKNAME_ERROR,
    CHANGE_NICKNAME,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_ERROR
} from "../action-types/profile";

const initialState = {
    nickname: null,
    error: null,
    loading: false
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NICKNAME:
            return {...state, loading: false, nickname: action.payload}
        case SET_NICKNAME_ERROR:
            return {...state, loading: false, error: action.payload}
        case FETCH_NICKNAME:
            return {...state, loading: true}
        case FETCH_NICKNAME_SUCCESS:
            return {...state, loading: false, nickname: action.payload}
        case FETCH_NICKNAME_ERROR:
            return {...state, loading: false, error: action.payload}
        case CHANGE_NICKNAME:
            return {...state, loading: true, error: null,}
        case CHANGE_NICKNAME_SUCCESS:
            return {...state, loading: false, nickname: action.payload}
        case CHANGE_NICKNAME_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}
