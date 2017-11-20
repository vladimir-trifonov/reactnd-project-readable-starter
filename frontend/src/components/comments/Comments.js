import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-md/lib/Lists'
import { deleteComment, loadComments, startEditComment } from '../../actions/comments'
import { Button } from 'react-md'
import EditComment from './EditComment'
import sortBy from 'sort-by'

const getOrderedComments = (comments) => {
  return comments.sort(sortBy('voteScore'))
}

class Comments extends PureComponent {
  constructor() {
    super()

    this.startEditComment = this.startEditComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  componentDidMount() {
    this.props.loadCommentsActionCreator(this.props.postId)
  }

  componentWillReceiveProps(nextProps) {
    (this.props.postId === nextProps.postId) || this.props.loadCommentsActionCreator(nextProps.postId)
  }

  startEditComment(commentId) {
    return () => {
      this.props.startEditCommentActionCreator(commentId)
    }
  }

  deleteComment(commentId) {
    return () => {
      this.props.deleteCommentActionCreator(commentId)
    }
  }

  render() {
    return (
      <List className='md-cell--8-tablet md-cell md-cell--6 md-paper md-paper--1'>
        {this.props.comments.map(comment => (
          <ListItem key={comment.id} primaryText={comment.body}>
            <Button icon iconChildren='close' onClick={this.deleteComment(comment.id)} />
            <Button icon iconChildren='edit' onClick={this.startEditComment(comment.id)} />
          </ListItem>
        ))}

        {this.props.editCommentId && <EditComment commentId={this.props.editCommentId} />}
      </List>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string,
  loadCommentsActionCreator: PropTypes.func.isRequired,
  startEditCommentActionCreator: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    comments: getOrderedComments(state.comments),
    editCommentId: state.editCommentId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCommentsActionCreator: (category) => loadComments(dispatch, category),
    deleteCommentActionCreator: (commentId) => deleteComment(dispatch, commentId),
    startEditCommentActionCreator: (commentId) => startEditComment(dispatch, commentId)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
