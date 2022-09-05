import {
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR,
    CHANGE_POST,
    CHANGE_POST_SUCCESS,
    CHANGE_POST_ERROR,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    CHANGE_POST_AUTHOR,
    CHANGE_POST_AUTHOR_SUCCESS,
    CHANGE_POST_AUTHOR_ERROR
} from "../action-types/posts";

const initialState = {
    posts: [],

    fetchPostsStatus: false,
    fetchPostsError: null,

    createPostStatus: false,
    createPostError: null,

    changePostStatus: false,
    changePostError: null,

    deletePostStatus: false,
    deletePostError: null,

    changePostAuthorStatus: false,
    changePostAuthorError: null
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {...state, fetchPostsStatus: true}

        case FETCH_POSTS_SUCCESS:
            return {...state, fetchPostsStatus: false, posts: action.payload}

        case FETCH_POSTS_ERROR:
            return {...state, fetchPostsStatus: false, fetchPostsError: action.payload, posts: []}

        case CREATE_POST:
            return {...state, createPostStatus: true}

        case CREATE_POST_SUCCESS:
            return {...state, createPostStatus: false, posts: [action.payload, ...state.posts]}

        case CREATE_POST_ERROR:
            return {...state, createPostStatus: false, createPostError: action.payload, posts: [...state.posts]}

        case DELETE_POST:
            return {...state, deletePostStatus: true}

        case DELETE_POST_SUCCESS:
            const newPostsArr = [...state.posts];
            const foundPost = state.posts.findIndex((item) => item.postId == action.payload);
            newPostsArr.splice(foundPost, 1);
            return {...state, deletePostStatus: false, posts: [...newPostsArr]}

        case DELETE_POST_ERROR:
            return {...state, deletePostStatus: false, createPostError: action.payload, posts: [...state.posts]}

        case CHANGE_POST:
            return {...state, changePostStatus: true}

        case CHANGE_POST_SUCCESS:
            const changedPostsArr = [...state.posts];
            let date = new Date(action.payload.updatedAt).toLocaleString();
            const objIndex = changedPostsArr.findIndex((obj => obj.postId === action.payload.id));
            changedPostsArr[objIndex].postText = action.payload.postText;
            changedPostsArr[objIndex].updatedAt = date;
            changedPostsArr.sort(function(a, b) {
                a = a.updatedAt;
                b = b.updatedAt;
                return a>b ? -1 : a<b ? 1 : 0;
            });
            return {...state, changePostStatus: false, posts: [...changedPostsArr]}

        case CHANGE_POST_ERROR:
            return {...state, changePostStatus: false, changePostError: action.payload, posts: [...state.posts]}

        case CHANGE_POST_AUTHOR:
            return {...state, changePostAuthorStatus: true}

        case CHANGE_POST_AUTHOR_SUCCESS:
            const changedPostsAuthorArr = [...state.posts];
            changedPostsAuthorArr.forEach((item) => {
                item.postAuthor = action.payload;
            })
            return {...state, changePostAuthorStatus: false, posts: [...changedPostsAuthorArr]}

        case CHANGE_POST_AUTHOR_ERROR:
            return {...state, changePostAuthorStatus: false, changePostAuthorError: action.payload, posts: [...state.posts]}

        default:
            return state
    }
}