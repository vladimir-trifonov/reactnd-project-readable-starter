import React from 'react'

import { Categories, AddPost, Posts } from '../components'

const HomeView = () => (
  <div>
    <div className='md-grid md-cell--6'>
      <Categories />
      <Posts />
    </div>
    <AddPost />
  </div>
)

export default HomeView
