import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-md/lib/Lists'
import { loadComments } from '../../actions/comments'
import sortBy from 'sort-by'

const getOrderedComments = (comments) => {
  return comments.sort(sortBy('voteScore'))
}

class Comments extends PureComponent {
  componentDidMount() {
    this.props.loadCommentsActionCreator(this.props.postId)
  }

  componentWillReceiveProps(nextProps) {
    (this.props.postId === nextProps.postId) || this.props.loadCommentsActionCreator(nextProps.postId)
  }

  render() {
    return (
      <List className='md-cell--8-tablet md-cell md-cell--6 md-paper md-paper--1'>
        {this.props.comments.map(comment => (
          <ListItem key={comment.id} primaryText={comment.title} />
        ))}
      </List>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string,
  loadCommentsActionCreator: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    comments: getOrderedComments(state.comments)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCommentsActionCreator: (category) => loadComments(dispatch, category)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
