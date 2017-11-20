/* global fetch */
const apiHost = process.env.REACT_APP_API_HOST

export const LOAD_POSTS = 'LOAD_POSTS'
export const ADD_POST = 'ADD_POST'
export const ORDER_POSTS_BY = 'ORDER_POSTS_BY'
export const LOAD_POST = 'LOAD_POST'

const loadPostAction = post => ({
  type: LOAD_POST,
  post
})

const addPostAction = post => ({
  type: ADD_POST,
  post
})

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
  return fetch(`${apiHost}/${category ? `${category}/` : ''}posts`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(posts => dispatch(loadPostsAction(posts)))
    .catch(error => console.error(error))
}

export function addPost(dispatch, currentCategory, post) {
  return fetch(`${apiHost}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (!currentCategory || currentCategory === result.category) {
        dispatch(addPostAction(result))
      }
    })
    .catch(error => console.error(error))
}

export function loadPost(dispatch, postId) {
  return fetch(`${apiHost}/posts/${postId}`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(post => dispatch(loadPostAction(post)))
    .catch(error => console.error(error))
}
