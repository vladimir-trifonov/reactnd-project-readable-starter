import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List, ListItem } from 'react-md/lib/Lists'
import Subheader from 'react-md/lib/Subheaders'
import { loadCategories } from '../actions/categories'

class Categories extends PureComponent {
  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <List className='list md-cell md-cell--6 md-paper md-paper--1'>
        <Subheader primaryText='Categories' />
        {this.props.categories.map(category => (
          <Link key={category.name} to={`/categories/${category.name}`} style={{ textDecoration: 'none' }}>
            <ListItem primaryText={category.name} />
          </Link>
        ))}
      </List>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
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
  mapDispatchToProps
)(Categories)
