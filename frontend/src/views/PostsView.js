import React from 'react'
import PropTypes from 'prop-types'
import { AddComment, Post, Comments }  from '../components'

const PostsView = ({ match: { params } }) => {
  return (
    <div>
      <div className='md-grid md-cell--6'>
        <Post postId={params.postId} />
        <Comments postId={params.postId} />
      </div>
      <AddComment postId={params.postId} />
    </div>
  )
}

PostsView.propTypes = {}

export default PostsView
