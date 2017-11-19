import { LOAD_CATEGORIES } from '../actions/categories'

const categories = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categories
