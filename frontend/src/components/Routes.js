import React from 'react'
import { Route } from 'react-router-dom'
import App from '../App'

const Routes = () => {
  return (
    <div className='app'>
      <Route exact path='/' render={() => <App />} />
    </div>
  )
}

export default Routes
