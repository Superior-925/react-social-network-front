import {ADD_POST, CHANGE_POST, DELETE_POST} from '../actions/actionTypes';

const initialState = {
  posts: []
}

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_POST:
      return {
        posts: state.posts
      }
    case CHANGE_POST:
      return {
        posts: state.posts
      }
    case DELETE_POST:
      return {
        posts: state.posts + action.payload
      }
    default:
      return state
  }
}