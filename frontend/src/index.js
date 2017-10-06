import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import configureStore from './store/configureStore'
import Routes from './components/Routes'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
