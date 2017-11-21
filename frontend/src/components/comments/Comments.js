import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-md/lib/Lists'
import sortBy from 'sort-by'
import { Button } from 'react-md'

import { deleteComment, loadComments, startEditComment, voteDownComment, voteUpComment } from '../../actions/comments'
import EditComment from './EditComment'

const getOrderedComments = (comments) => {
  return comments.sort(sortBy('voteScore'))
}

class Comments extends PureComponent {
  constructor () {
    super()

    this.startEditComment = this.startEditComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.voteUp = this.voteUp.bind(this)
    this.voteDown = this.voteDown.bind(this)
  }

  componentDidMount () {
    this.props.loadCommentsActionCreator(this.props.postId)
  }

  componentWillReceiveProps (nextProps) {
    (this.props.postId === nextProps.postId) || this.props.loadCommentsActionCreator(nextProps.postId)
  }

  startEditComment (commentId) {
    return () => {
      this.props.startEditCommentActionCreator(commentId)
    }
  }

  deleteComment (commentId) {
    return () => {
      this.props.deleteCommentActionCreator(commentId)
    }
  }

  voteDown (commentId) {
    return () => { this.props.voteDownCommentActionCreator(commentId) }
  }

  voteUp (commentId) {
    return () => { this.props.voteUpCommentActionCreator(commentId) }
  }

  render () {
    return (
      <List className='md-cell--8-tablet md-cell md-cell--12 md-paper md-paper--1'>
        {this.props.comments.map(comment => (
          <ListItem key={comment.id} primaryText={`Author: ${comment.author}`} secondaryText={comment.body}>
            <div className='pull-right'>
              <Button icon iconClassName='material-icons' onClick={this.voteDown(comment.id)} >favorite_border</Button><span className='vote-score-item-text'>{comment.voteScore}</span><Button icon iconClassName='material-icons' onClick={this.voteUp(comment.id)}>favorite</Button>
              <Button icon iconChildren='close' onClick={this.deleteComment(comment.id)} />
              <Button icon iconChildren='edit' onClick={this.startEditComment(comment.id)} />
            </div>
          </ListItem>
        ))}

        {this.props.editedCommentId && <EditComment commentId={this.props.editedCommentId} />}
      </List>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string,
  loadCommentsActionCreator: PropTypes.func.isRequired,
  startEditCommentActionCreator: PropTypes.func.isRequired,
  deleteCommentActionCreator: PropTypes.func.isRequired,
  editedCommentId: PropTypes.string,
  voteDownCommentActionCreator: PropTypes.func.isRequired,
  voteUpCommentActionCreator: PropTypes.func.isRequired
}

const mapStateToProps = ({comments, editedCommentId}) => {
  return {
    comments: getOrderedComments(comments),
    editedCommentId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCommentsActionCreator: (category) => loadComments(dispatch, category),
    deleteCommentActionCreator: (commentId) => deleteComment(dispatch, commentId),
    startEditCommentActionCreator: (commentId) => startEditComment(dispatch, commentId),
    voteDownCommentActionCreator: (postId) => voteDownComment(dispatch, postId),
    voteUpCommentActionCreator: (postId) => voteUpComment(dispatch, postId)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
