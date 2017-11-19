import React from 'react'
import PropTypes from 'prop-types'
import { Categories, AddPost, Posts }  from '../components'
import { Button } from 'react-md'

const CategoriesView = ({ match: { params } }) => {
  return (
    <div>
      <div className='md-grid md-cell--6'>
        <Categories />
        <Posts category={params.category} />
      </div>
      <AddPost />
    </div>
  )
}

CategoriesView.propTypes = {}

export default CategoriesView
