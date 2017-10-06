import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const store = createStore(
  combineReducers({
    ...reducers,
    routing
  }),
  applyMiddleware(
    createLogger(),
    thunk
  )
)

export default store
