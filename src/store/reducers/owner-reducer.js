import {SET_OWNER_TRUE, SET_OWNER_FALSE} from '../action-types/page-owner';

const initialState = {
    pageOwner: true
}

export const ownerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OWNER_TRUE:
            return {...state, pageOwner: true}
        case SET_OWNER_FALSE:
            return {...state, pageOwner: false}
        default:
            return state
    }
}
