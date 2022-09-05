import {SET_OWNER_TRUE, SET_OWNER_FALSE} from '../action-types/page-owner';

export const setOwnerTrue = () => {
    return (dispatch) => {
        dispatch({type: SET_OWNER_TRUE})
    }
}

export const setOwnerFalse = () => {
    return (dispatch) => {
        dispatch({type: SET_OWNER_FALSE})
    }
}
