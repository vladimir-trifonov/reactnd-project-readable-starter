import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import categories from './categories'
import comments from './comments'
import * as posts from './posts'

export default combineReducers({
  categories,
  comments,
  ...posts,
  routing
})
