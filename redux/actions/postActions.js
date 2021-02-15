import * as types from "../types";
import axios from "axios";

export const fetchPosts = () => {

  return async (dispatch) => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        dispatch({
          type: types.GET_POSTS,
          payload: response.data,
        });
      })
      .catch((err) =>
        dispatch({ type: types.LOAD_POSTS_ERROR, payload: err.toString() })
      );
  };


};

export const deletePost = (id) => {
    return{
        type : types.DELETE_POST,
        payload : id
    }
}

export const editPost = (data) => {
    return{
        type : types.UPDATE_POST,
        payload : data
    }
}
