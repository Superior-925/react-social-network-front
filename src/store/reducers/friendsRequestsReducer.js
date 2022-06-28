import {
    FETCH_REQUESTS,
    FETCH_REQUESTS_SUCCESS,
    FETCH_REQUESTS_ERROR,
    ADD_REQUEST,
    ADD_REQUEST_SUCCESS,
    ADD_REQUEST_ERROR,
    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_ERROR
} from "../action-types/requests";

const initialState = {
    requests: [],

    fetchRequestsStatus: false,
    fetchRequestsError: null,

    addRequestStatus: false,
    addRequestError: null,

    deleteRequestStatus: false,
    deleteRequestError: null,
}

export const friendsRequestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUESTS:
            return {...state, fetchRequestsStatus: true}

        case FETCH_REQUESTS_SUCCESS:
            return {...state, fetchRequestsStatus: false, requests: action.payload}

        case FETCH_REQUESTS_ERROR:
            return {...state, fetchRequestsStatus: false, fetchRequestsError: action.payload, requests: []}

        case ADD_REQUEST:
            return {...state, addRequestStatus: true}

        case ADD_REQUEST_SUCCESS:
            return {...state, addRequestStatus: false, requests: [action.payload, ...state.requests]}

        case ADD_REQUEST_ERROR:
            return {...state, addRequestStatus: false, addRequestError: action.payload, requests: [...state.requests]}

        case DELETE_REQUEST:
            return {...state, deleteRequestStatus: true}

        case DELETE_REQUEST_SUCCESS:
            const newRequestsArr = [...state.requests];
            const foundRequest = state.requests.findIndex((item) => item.requestId === action.payload);
            newRequestsArr.splice(foundRequest, 1);
            return {...state, deleteRequestStatus: false, requests: [...newRequestsArr]}

        case DELETE_REQUEST_ERROR:
            return {...state, deleteRequestStatus: false, deleteRequestError: action.payload, requests: [...state.requests]}

        default:
            return state
    }
}