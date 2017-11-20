import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-md/lib/Lists'
import { NavLink } from 'react-router-dom'
import { loadPosts, orderPostsBy, deletePost, startEditPost } from '../../actions/posts'
import { Button } from 'react-md'
import SelectField from 'react-md/lib/SelectFields'
import sortBy from 'sort-by'
import EditPost from './EditPost'

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

class Posts extends PureComponent {
  constructor() {
    super()

    this.startEditPost = this.startEditPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.changePostsOrder = this.changePostsOrder.bind(this)
  }

  componentDidMount() {
    this.props.loadPostsActionCreator(this.props.category)
  }

  componentWillReceiveProps(nextProps) {
    (this.props.category === nextProps.category) || this.props.loadPostsActionCreator(nextProps.category)
  }

  changePostsOrder(value) {
    this.props.orderPostsByActionCreator(value)
  }

  startEditPost(postId) {
    return (e) => {
      e.preventDefault()
      this.props.startEditPostActionCreator(postId)
    }
  }

  deletePost(postId) {
    return (e) => {
      e.preventDefault()
      this.props.deletePostActionCreator(postId)
    }
  }

  render() {
    return (
      <List className='md-cell--8-tablet md-cell md-cell--6 md-paper md-paper--1'>
        <SelectField
          id='posts-order'
          label='Posts by'
          defaultValue={this.props.orderPostsBy}
          menuItems={ORDER_BY}
          className='md-cell md-cell--12'
          onChange={this.changePostsOrder}
        />
        {this.props.posts.map(post => (
          <NavLink key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
            <ListItem primaryText={post.title}>
              <Button icon iconChildren='close' onClick={this.deletePost(post.id)} />
              <Button icon iconChildren='edit' onClick={this.startEditPost(post.id)} />
            </ListItem>
          </NavLink>
        ))}
        
        {this.props.editedPostId && <EditPost postId={this.props.editedPostId} category={this.props.category} />}
      </List>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  category: PropTypes.string,
  orderPostsBy: PropTypes.string,
  loadPostsActionCreator: PropTypes.func.isRequired,
  orderPostsByActionCreator: PropTypes.func.isRequired,
  startEditPostActionCreator: PropTypes.func.isRequired,
  deletePostActionCreator: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    orderPostsBy: state.orderPostsBy,
    posts: getOrderedPosts(state.posts, state.orderPostsBy),
    editedPostId: state.editedPostId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostsActionCreator: (category) => loadPosts(dispatch, category),
    orderPostsByActionCreator: (orderBy) => orderPostsBy(dispatch, orderBy),
    deletePostActionCreator: (postId) => deletePost(dispatch, postId),
    startEditPostActionCreator: (postId) => startEditPost(dispatch, postId)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
