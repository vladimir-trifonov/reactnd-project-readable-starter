import { LOAD_POSTS, ORDER_POSTS_BY } from '../actions/posts'

const posts = (state = [], action) => {
  switch (action.type) {
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

export {posts, orderPostsBy}
