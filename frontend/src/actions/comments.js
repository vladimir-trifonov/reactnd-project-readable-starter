/* global fetch */
export const LOAD_COMMENTS = 'LOAD_COMMENTS'

const loadCommentsAction = comments => ({
  type: LOAD_COMMENTS,
  comments
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
