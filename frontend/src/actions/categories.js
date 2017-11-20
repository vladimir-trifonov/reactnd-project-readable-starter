/* global fetch */
const apiHost = process.env.REACT_APP_API_HOST

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

const loadCategoriesAction = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export function loadCategories (dispatch) {
  return fetch(`${apiHost}/categories`, {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(({ categories }) => dispatch(loadCategoriesAction(categories)))
    .catch(error => console.error(error))
}
