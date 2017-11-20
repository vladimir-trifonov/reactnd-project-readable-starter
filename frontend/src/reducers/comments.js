import { ADD_COMMENT, DELETE_COMMENT, LOAD_COMMENTS, START_EDIT_COMMENT, UPDATE_COMMENT, STOP_EDIT_COMMENT } from '../actions/comments'

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.comment]
    case DELETE_COMMENT:
      return state.filter(c => c.id !== action.commentId)
    case LOAD_COMMENTS:
      return action.comments
    case UPDATE_COMMENT:
      return [...state.filter(c => c.id !== action.comment.id), action.comment]
    default:
      return state
  }
}

const editCommentId = (state = '', action) => {
  switch (action.type) {
    case START_EDIT_COMMENT:
      return action.commentId
    case STOP_EDIT_COMMENT:
      return ''
    default:
      return state
  }
}

export { comments, editCommentId }
