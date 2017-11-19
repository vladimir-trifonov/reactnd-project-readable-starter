/* global fetch */
export const LOAD_POST = 'LOAD_POST'

const loadPostAction = post => ({
  type: LOAD_POST,
  post
})

export function loadPost(dispatch, postId) {
  return fetch(`http://localhost:3001/posts/${postId}`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(post => dispatch(loadPostAction(post)))
    .catch(error => console.error(error))
}
