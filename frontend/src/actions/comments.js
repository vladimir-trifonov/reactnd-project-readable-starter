/* global fetch */
const apiHost = process.env.REACT_APP_API_HOST

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const START_EDIT_COMMENT = 'START_EDIT_COMMENT'
export const STOP_EDIT_COMMENT = 'STOP_EDIT_COMMENT'

const loadCommentsAction = comments => ({
  type: LOAD_COMMENTS,
  comments
})

const addCommentAction = comment => ({
  type: ADD_COMMENT,
  comment
})

const deleteCommentAction = commentId => ({
  type: DELETE_COMMENT,
  commentId
})

const updateCommentAction = comment => ({
  type: UPDATE_COMMENT,
  comment
})

const startEditCommentAction = commentId => ({
  type: START_EDIT_COMMENT,
  commentId
})

const stopEditCommentAction = () => ({
  type: STOP_EDIT_COMMENT
})

export function loadComments (dispatch, postId) {
  return fetch(`${apiHost}/posts/${postId}/comments`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(comments => dispatch(loadCommentsAction(comments)))
    .catch(error => console.error(error))
}

export function addComment (dispatch, comment) {
  return fetch(`${apiHost}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => dispatch(addCommentAction(result)))
    .catch(error => console.error(error))
}

export function deleteComment (dispatch, commentId) {
  return fetch(`${apiHost}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(result => dispatch(deleteCommentAction(commentId)))
    .catch(error => console.error(error))
}

export function updateComment (dispatch, comment) {
  return fetch(`${apiHost}/comments/${comment.id}`, {
    method: 'PUT',
    body: JSON.stringify(comment),
    headers: {
      'Authorization': 'readable-app',
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => dispatch(updateCommentAction(result)))
    .catch(error => console.error(error))
}

export function startEditComment (dispatch, commentId) {
  dispatch(startEditCommentAction(commentId))
}

export function stopEditComment (dispatch) {
  dispatch(stopEditCommentAction())
}
