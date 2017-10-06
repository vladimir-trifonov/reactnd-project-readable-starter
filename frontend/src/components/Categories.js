import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-md/lib/Lists'
import Subheader from 'react-md/lib/Subheaders'

function CategoriesList({ categories }) {
  return (
    <div className='categories'>
      <div className='md-grid'>
        <List className='md-cell md-paper md-paper--1'>
          <Subheader primaryText='Categories' />
          {categories.map(category => (
            <ListItem key={category.id} primaryText={category.title} />
          ))}
        </List>
      </div>
    </div>
  )
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Categories = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList)

export default Categories
