import {combineReducers} from "redux";
import {avatarReducer} from "./avatarReducer";
import {profileReducer} from "./profileReducer";
import {postsReducer} from "./postsReducer";

export const rootReducer = combineReducers({
    avatar: avatarReducer,
    profile: profileReducer,
    posts: postsReducer
})
