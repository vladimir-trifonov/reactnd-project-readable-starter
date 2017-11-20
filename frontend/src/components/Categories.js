import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { List, ListItem } from 'react-md/lib/Lists'
import Subheader from 'react-md/lib/Subheaders'

import { loadCategories } from '../actions/categories'

class Categories extends Component {
  componentDidMount () {
    this.props.loadCategories()
  }

  render () {
    return (
      <List className='md-cell--8-tablet md-cell md-cell--6 md-paper md-paper--1'>
        <Subheader primaryText='Categories' />
        {this.props.categories.map(category => (
          <NavLink activeClassName='selected' key={category.name} to={`/categories/${category.path}`} style={{ textDecoration: 'none' }}>
            <ListItem primaryText={category.name} />
          </NavLink>
        ))}
      </List>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  loadCategories: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => loadCategories(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null, {
    pure: false
  }
)(Categories)
