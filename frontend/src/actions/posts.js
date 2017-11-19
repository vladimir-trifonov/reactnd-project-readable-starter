/* global fetch */
export const LOAD_POSTS = 'LOAD_POSTS'
export const ORDER_POSTS_BY = 'ORDER_POSTS_BY'

const loadPostsAction = posts => ({
  type: LOAD_POSTS,
  posts
})

export const orderPostsByAction = orderPostsBy => ({
  type: ORDER_POSTS_BY,
  orderPostsBy
})

export function orderPostsBy(dispatch, orderPostsBy) {
  return dispatch(orderPostsByAction(orderPostsBy))
}

export function loadPosts(dispatch, category) {
  return fetch(`http://localhost:3001/${category ? `${category}/` : ''}posts`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(posts => dispatch(loadPostsAction(posts)))
    .catch(error => console.error(error))
}
