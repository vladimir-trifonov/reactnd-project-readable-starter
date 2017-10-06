import React, { Component } from 'react'
import Categories from './components/Categories'
import Posts from './components/Posts'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Blog</h1>
        </header>
        <div className='md-grid md-cell--6'>
          <Categories />
          <Posts />
        </div>
      </div>
    )
  }
}

export default App
