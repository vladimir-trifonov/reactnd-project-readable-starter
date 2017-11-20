/* global fetch */
const apiHost = process.env.REACT_APP_API_HOST

export const LOAD_POSTS = 'LOAD_POSTS'
export const ADD_POST = 'ADD_POST'
export const ORDER_POSTS_BY = 'ORDER_POSTS_BY'
export const LOAD_POST = 'LOAD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const START_EDIT_POST = 'START_EDIT_POST'
export const STOP_EDIT_POST = 'STOP_EDIT_POST'

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

const deletePostAction = postId => ({
  type: DELETE_POST,
  postId
})

const updatePostAction = post => ({
  type: UPDATE_POST,
  post
})

const startEditPostAction = postId => ({
  type: START_EDIT_POST,
  postId
})

const stopEditPostAction = () => ({
  type: STOP_EDIT_POST
})

export function orderPostsBy (dispatch, orderPostsBy) {
  return dispatch(orderPostsByAction(orderPostsBy))
}

export function loadPosts (dispatch, category) {
  return fetch(`${apiHost}/${category ? `${category}/` : ''}posts`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(posts => dispatch(loadPostsAction(posts)))
    .catch(error => console.error(error))
}

export function addPost (dispatch, currentCategory, post) {
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

export function loadPost (dispatch, postId) {
  return fetch(`${apiHost}/posts/${postId}`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(post => dispatch(loadPostAction(post)))
    .catch(error => console.error(error))
}

export function deletePost (dispatch, postId) {
  return fetch(`${apiHost}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(result => dispatch(deletePostAction(postId)))
    .catch(error => console.error(error))
}

export function updatePost (dispatch, currentCategory, post) {
  return fetch(`${apiHost}/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (!currentCategory || currentCategory === result.category) {
        dispatch(updatePostAction(result))
      } else {
        dispatch(deletePostAction(result.id))
      }
    })
    .catch(error => console.error(error))
}

export function startEditPost (dispatch, postId) {
  dispatch(startEditPostAction(postId))
}

export function stopEditPost (dispatch) {
  dispatch(stopEditPostAction())
}
