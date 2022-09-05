import {
    FETCH_FRIENDS,
    FETCH_FRIENDS_SUCCESS,
    FETCH_FRIENDS_ERROR,
    ADD_FRIEND,
    ADD_FRIEND_SUCCESS,
    ADD_FRIEND_ERROR,
    DELETE_FRIEND,
    DELETE_FRIEND_SUCCESS,
    DELETE_FRIEND_ERROR
} from "../action-types/friends";

const initialState = {
    friends: [],

    fetchFriendsStatus: false,
    fetchFriendsError: null,

    addFriendStatus: false,
    addFriendError: null,

    deleteFriendStatus: false,
    deleteFriendError: null,
}

export const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FRIENDS:
            return {...state, fetchFriendsStatus: true}

        case FETCH_FRIENDS_SUCCESS:
            return {...state, fetchFriendsStatus: false, friends: action.payload}

        case FETCH_FRIENDS_ERROR:
            return {...state, fetchPostsStatus: false, fetchFriendsError: action.payload, friends: []}

        case ADD_FRIEND:
            return {...state, addFriendStatus: true}

        case ADD_FRIEND_SUCCESS:
            return {...state, addFriendStatus: false, friends: [action.payload, ...state.friends]}

        case ADD_FRIEND_ERROR:
            return {...state, addFriendStatus: false, addFriendError: action.payload, friends: [...state.friends]}

        case DELETE_FRIEND:
            return {...state, deleteFriendStatus: true}

        case DELETE_FRIEND_SUCCESS:
            const newFriendsArr = [...state.friends];
            const foundFriend = state.friends.findIndex((item) => item.friendId === action.payload);
            newFriendsArr.splice(foundFriend, 1);
            return {...state, deleteFriendStatus: false, friends: [...newFriendsArr]}

        case DELETE_FRIEND_ERROR:
            return {...state, deleteFriendStatus: false, deleteFriendError: action.payload, friends: [...state.friends]}

        default:
            return state
    }
}