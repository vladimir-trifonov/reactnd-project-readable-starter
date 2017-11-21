import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import './App.css'
import { HomeView, CategoriesView, PostsView, PageNotFoundView } from './views'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>
            <Link to='/' className='logo-link'>Blog</Link>
          </h1>
        </header>
        <Switch>
          <Route path='/' exact component={HomeView} />
          <Route path='/notfound' component={PageNotFoundView} />
          <Route path='/:category' exact component={CategoriesView} />
          <Route path='/:category/:postId' exact component={PostsView} />
          <Redirect to='/' />
        </Switch>
      </div>
    )
  }
}

export default App
