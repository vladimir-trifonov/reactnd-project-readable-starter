import { LOAD_POST, ADD_POST, LOAD_POSTS, ORDER_POSTS_BY } from '../actions/posts'

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.post]
    case LOAD_POSTS:
      return action.posts
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

export {post, posts, orderPostsBy}
