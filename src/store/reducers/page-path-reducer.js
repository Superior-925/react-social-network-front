import {SET_PAGE_PATH} from "../action-types/page-path";

const initialState = {
    pagePath: ''
}

export const pagePathReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE_PATH:
            return {...state, pagePath: action.payload}
        default:
            return state
    }
}
