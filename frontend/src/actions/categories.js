/* global fetch */
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

const loadCategoriesAction = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export function loadCategories(dispatch) {
  return fetch('http://localhost:3001/categories', {
    headers: {
      'Authorization': 'readable-app'
    }
  })
    .then(response => response.json())
    .then(({ categories }) => dispatch(loadCategoriesAction(categories)))
    .catch(error => console.error(error))
}
