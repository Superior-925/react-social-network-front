import {combineReducers} from "redux";
import {avatarReducer} from "./avatarReducer";
import {profileReducer} from "./profileReducer";

export const rootReducer = combineReducers({
    avatar: avatarReducer,
    profile: profileReducer
})
