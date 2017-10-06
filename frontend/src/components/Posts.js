import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-md/lib/Lists'
import { loadPosts, orderPostsBy } from '../actions/posts'
import SelectField from 'react-md/lib/SelectFields'
import sortBy from 'sort-by'

const ORDER_BY = ['Vote', 'Date']
const getOrderedPosts = (posts, orderBy) => {
  switch (orderBy) {
    case 'Vote':
      return posts.sort(sortBy('voteScore'))
    case 'Date':
      return posts.sort(sortBy('timestamp'))
    default:
      return posts
  }
}

class Posts extends Component {
  constructor() {
    super()

    this.changePostsOrder = this.changePostsOrder.bind(this)
  }

  componentDidMount() {
    this.props.loadPostsActionCreator()
  }

  changePostsOrder(value) {
    this.props.orderPostsByActionCreator(value)
  }

  render() {
    return (
      <List className='md-cell md-cell--6 md-paper md-paper--1'>
        <SelectField
          id='posts-order'
          label='Posts by'
          defaultValue={this.props.orderPostsBy}
          menuItems={ORDER_BY}
          className='md-cell md-cell--12'
          onChange={this.changePostsOrder}
        />
        {this.props.posts.map(post => (
          <ListItem key={post.id} primaryText={post.title} />
        ))}
      </List>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    orderPostsBy: state.orderPostsBy,
    posts: getOrderedPosts(state.posts, state.orderPostsBy)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostsActionCreator: () => loadPosts(dispatch),
    orderPostsByActionCreator: (orderBy) => orderPostsBy(dispatch, orderBy)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
