import React, { Component } from 'react'
import Categories from './components/Categories'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Blog</h1>
        </header>
        <div className='md-grid'>
          <h2 className='md-cell md-cell--12 md-text-container'>
            <Categories />
          </h2>
        </div>
      </div>
    )
  }
}

export default App
