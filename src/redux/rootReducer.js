import {combineReducers} from 'redux'

import post from './reducers/post'
import commentReducer from './reducers/comment-reducer'

export default combineReducers({
  postReducer: post
})