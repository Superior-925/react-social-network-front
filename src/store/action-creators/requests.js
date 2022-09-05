import axios from "axios";
import {configDev} from "../../environment/environment.dev";

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

export const fetchFriendsRequests = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_REQUESTS})
            const response = await axios.get(`http://${configDev.hostPort}/request/`+userId, {
                headers: {"Authorization": `${localStorage.getItem("token")}`}
            });
            // const requestsArr = [];
            // response.data.candidates.forEach((item) => {
            //     const friendRequest = {userId: item.userId, candidateId: item.candidateId};
            //     requestsArr.push(friendRequest)
            // });

            //array of my requests.jsx to friends
            const friendsRequestsArr = [];
            //array of requests.jsx to me
            const candidatesRequestsArr = [];
            response.data.candidates.forEach((candidate) => {
                const friendRequest = {
                    id: candidate._id,
                    userId: candidate.userId,
                    candidateId: candidate.candidateId
                };
                friendsRequestsArr.push(friendRequest);
            });
            response.data.requests.forEach((request) => {
                const candidateRequest = {
                    id: request._id,
                    candidate: request.candidateId,
                    userId: request.userId
                };
                candidatesRequestsArr.push(candidateRequest);
            })
            const requests = {friendsRequestsArr, candidatesRequestsArr}
            //delay for simulating a request to a remote server
            setTimeout(() => {
                dispatch({type: FETCH_REQUESTS_SUCCESS, payload: requests})
            }, 1000)
            return response
        } catch (e) {
            dispatch({
                type: FETCH_REQUESTS_ERROR,
                payload: 'An error occurred while loading requests.jsx'
            })
        }
    }
}
