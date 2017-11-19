import React, { Component } from 'react'
import { Switch, Redirect, Route, Link } from 'react-router-dom'
import './App.css'

import { HomeView, CategoriesView, PostsView } from './views'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Blog</Link>
          </h1>
        </header>
        <Switch>
          <Route path='/' exact component={HomeView} />
          <Route path='/categories/:category' exact component={CategoriesView} />
          <Route path='/posts/:postId' exact component={PostsView} />
          <Redirect to='/' />
        </Switch>
      </div>
    )
  }
}

export default App
