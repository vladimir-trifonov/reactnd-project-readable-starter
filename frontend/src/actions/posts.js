/* global fetch */
import { LOAD_POST, ORDER_POSTS_BY, LOAD_POSTS, ADD_POST, DELETE_POST, UPDATE_POST, START_EDIT_POST, STOP_EDIT_POST } from './types'

const apiHost = process.env.REACT_APP_API_HOST

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

function getPostCommentsCount (postId) {
  return fetch(`${apiHost}/posts/${postId}/comments`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(comments => {
      let result = {}
      result[postId] = comments.length
      return result
    })
    .catch(error => console.error(error))
}

export function loadPosts (dispatch, category) {
  return fetch(`${apiHost}/${category ? `${category}/` : ''}posts`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(posts => {
      // Get comments for every post, because we need their count
      Promise.all(posts.map(post => getPostCommentsCount(post.id)))
        .then(commentsCountByPosts => {
          // Flatten the objects of { postId: commentsCount } objects
          commentsCountByPosts = commentsCountByPosts.reduce((res, curr) => {
            let postId = Object.keys(curr)[0]
            res[postId] = curr[postId]
            return res
          }, {})

          // Add commentsCount prop to the post
          posts = posts.map(post => {
            post.commentsCount = commentsCountByPosts[post.id]
            return post
          })
          dispatch(loadPostsAction(posts))
        })
    })
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

export function loadPost (dispatch, postId, onMissingPostCb) {
  return fetch(`${apiHost}/posts/${postId}`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(post => {
      if (post && post.id) {
        dispatch(loadPostAction(post))
      } else {
        onMissingPostCb()
      }
    })
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

// Get comments count by post id and fire updatePostAction
function getPostCommentsAndDispathUpdateAction (dispatch, result) {
  getPostCommentsCount(result.id)
    .then(commentsCount => {
      result.commentsCount = commentsCount[result.id]
      dispatch(updatePostAction(result))
    })
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
        getPostCommentsAndDispathUpdateAction(dispatch, result)
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

export function voteUpPost (dispatch, postId, isDetails) {
  return fetch(`${apiHost}/posts/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' }),
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (isDetails) {
        dispatch(loadPostAction(result))
      } else {
        getPostCommentsAndDispathUpdateAction(dispatch, result)
      }
    })
    .catch(error => console.error(error))
}

export function voteDownPost (dispatch, postId, isDetails) {
  return fetch(`${apiHost}/posts/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' }),
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (isDetails) {
        dispatch(loadPostAction(result))
      } else {
        getPostCommentsAndDispathUpdateAction(dispatch, result)
      }
    })
    .catch(error => console.error(error))
}
