/* global fetch */
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

const loadCommentsAction = comments => ({
  type: LOAD_COMMENTS,
  comments
})

const addCommentAction = comment => ({
  type: ADD_COMMENT,
  comment
})

export function loadComments(dispatch, postId) {
  return fetch(`http://localhost:3001/posts/${postId}/comments`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(comments => dispatch(loadCommentsAction(comments)))
    .catch(error => console.error(error))
}

export function addComment(dispatch, comment) {
  return fetch(`http://localhost:3001/comments`, {
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
