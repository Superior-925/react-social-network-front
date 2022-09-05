import {combineReducers} from "redux";
import {avatarReducer} from "./avatar-reducer";
import {profileReducer} from "./profile-reducer";
import {postsReducer} from "./posts-reducer";
import {friendsRequestsReducer} from "./friends-requests-reducer";
import {ownerReducer} from "./owner-reducer";
import {pagePathReducer} from "./page-path-reducer";

export const rootReducer = combineReducers({
    avatar: avatarReducer,
    profile: profileReducer,
    posts: postsReducer,
    request: friendsRequestsReducer,
    owner: ownerReducer,
    page: pagePathReducer
})
