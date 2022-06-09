import {ADD_POST, CHANGE_POST, DELETE_POST} from './actionTypes'
import axios from "axios";

export function fetchPosts() {
  return async dispatch => {
    try {

      console.log('Hi there!');
    } catch (error) {
      console.log(error)
    }
  }
}

export function addPost() {
  return {
    type: ADD_POST
  }
}

export function deletePost() {
  return {
    type: DELETE_POST
  }
}

export function changePost(number) {
  return {
    type: CHANGE_POST,
    payload: number
  }
}