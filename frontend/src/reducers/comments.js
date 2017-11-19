import { ADD_COMMENT, LOAD_COMMENTS } from '../actions/comments'

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.comment]
    case LOAD_COMMENTS:
      return action.comments
    default:
      return state
  }
}

export default comments
