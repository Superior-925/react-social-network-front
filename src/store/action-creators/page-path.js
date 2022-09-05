import {SET_PAGE_PATH} from "../action-types/page-path";

export const setPagePath = (path) => {
    return (dispatch) => {
        dispatch({type: SET_PAGE_PATH, payload: path})
    }
}
