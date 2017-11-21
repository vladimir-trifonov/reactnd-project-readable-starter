import { LOAD_POST, ADD_POST, LOAD_POSTS, ORDER_POSTS_BY, DELETE_POST, START_EDIT_POST, UPDATE_POST, STOP_EDIT_POST } from '../actions/types'

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.post]
    case DELETE_POST:
      return state.filter(c => c.id !== action.postId)
    case LOAD_POSTS:
      return action.posts
    case UPDATE_POST:
      debugger
      return [...state.filter(c => c.id !== action.post.id), action.post]
    default:
      return state
  }
}

const orderPostsBy = (state = 'Vote', action) => {
  switch (action.type) {
    case ORDER_POSTS_BY:
      return action.orderPostsBy
    default:
      return state
  }
}

const post = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POST:
      return action.post
    default:
      return state
  }
}

const editedPostId = (state = '', action) => {
  switch (action.type) {
    case START_EDIT_POST:
      return action.postId
    case STOP_EDIT_POST:
      return ''
    default:
      return state
  }
}

export { post, posts, orderPostsBy, editedPostId }
