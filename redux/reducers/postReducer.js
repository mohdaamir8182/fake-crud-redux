import * as types from "../types";
const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case types.UPDATE_POST:
        console.log("UPDATED...." , action.payload)
      return {
        ...state,
        posts: state.posts.map(post => post.id === action.payload.id ?
            // transform the one with a matching id
                 action.payload  : 
            // otherwise return original todo
                 post
        ),
        loading: false,
        error: action.payload,
      };
      case types.DELETE_POST:
      return {
        ...state,
        posts: [
            ...state.posts.filter(post => post.id !== action.payload)
        ],
        loading: false,
        error: action.payload,
      };
      case types.LOAD_POSTS_ERROR:
        return {
          ...state,
          posts: [],
          loading: false,
          error: action.payload,
    };
    default:
      return state;
  }
};
