import {
    FETCH_AVATAR,
    FETCH_AVATAR_SUCCESS,
    FETCH_AVATAR_ERROR,
    CHANGE_AVATAR,
    CHANGE_AVATAR_SUCCESS,
    CHANGE_AVATAR_ERROR, FETCH_AVATAR_NO_IMAGE
} from "../action-types/avatar";

const initialState = {
    avatar: null,
    error: null,
    loading: false
}

export const avatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AVATAR:
            return {...state, loading: true}
        case FETCH_AVATAR_SUCCESS:
            return {...state, loading: false, avatar: action.payload}
        case FETCH_AVATAR_NO_IMAGE:
            return {...state, loading: false, avatar: action.payload}
        case FETCH_AVATAR_ERROR:
            return {...state, loading: false, error: action.payload}
        case CHANGE_AVATAR:
            return {...state, loading: true}
        case CHANGE_AVATAR_SUCCESS:
            return {...state, loading: false, avatar: action.payload}
        case CHANGE_AVATAR_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}
