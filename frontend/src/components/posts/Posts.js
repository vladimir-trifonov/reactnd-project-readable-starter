import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-md/lib/Lists'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-md'
import SelectField from 'react-md/lib/SelectFields'
import sortBy from 'sort-by'

import { loadPosts, orderPostsBy, deletePost, startEditPost, voteDownPost, voteUpPost } from '../../actions/posts'
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
  constructor () {
    super()

    this.startEditPost = this.startEditPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.changePostsOrder = this.changePostsOrder.bind(this)
    this.voteUp = this.voteUp.bind(this)
    this.voteDown = this.voteDown.bind(this)
  }

  componentDidMount () {
    this.props.loadPostsActionCreator(this.props.category)
  }

  componentWillReceiveProps (nextProps) {
    (this.props.category === nextProps.category) || this.props.loadPostsActionCreator(nextProps.category)
  }

  changePostsOrder (value) {
    this.props.orderPostsByActionCreator(value)
  }

  startEditPost (postId) {
    return (e) => {
      e.preventDefault()
      this.props.startEditPostActionCreator(postId)
    }
  }

  deletePost (postId) {
    return (e) => {
      e.preventDefault()
      this.props.deletePostActionCreator(postId)
    }
  }

  voteDown (postId) {
    return (e) => {
      e.preventDefault()
      this.props.voteDownPostActionCreator(postId)
    }
  }

  voteUp (postId) {
    return (e) => {
      e.preventDefault()
      this.props.voteUpPostActionCreator(postId)
    }
  }

  render () {
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
          <NavLink key={post.id} to={`/${post.category}/${post.id}`} className='nav-link'>
            <ListItem primaryText={post.title}>
              <Button icon iconClassName='material-icons' onClick={this.voteDown(post.id)} >favorite_border</Button><span className='vote-score-item-text'>{post.voteScore}</span><Button icon iconClassName='material-icons' onClick={this.voteUp(post.id)}>favorite</Button>
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
  deletePostActionCreator: PropTypes.func.isRequired,
  editedPostId: PropTypes.string,
  voteDownPostActionCreator: PropTypes.func.isRequired,
  voteUpPostActionCreator: PropTypes.func.isRequired
}

const mapStateToProps = ({orderPostsBy, posts, editedPostId}) => {
  return {
    orderPostsBy,
    editedPostId,
    posts: getOrderedPosts(posts, orderPostsBy)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostsActionCreator: (category) => loadPosts(dispatch, category),
    orderPostsByActionCreator: (orderBy) => orderPostsBy(dispatch, orderBy),
    deletePostActionCreator: (postId) => deletePost(dispatch, postId),
    startEditPostActionCreator: (postId) => startEditPost(dispatch, postId),
    voteDownPostActionCreator: (postId) => voteDownPost(dispatch, postId),
    voteUpPostActionCreator: (postId) => voteUpPost(dispatch, postId)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
