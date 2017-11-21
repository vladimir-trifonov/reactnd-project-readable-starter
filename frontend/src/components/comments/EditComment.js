import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, DialogContainer, TextField } from 'react-md'

import { updateComment, stopEditComment } from '../../actions/comments'

class EditComment extends PureComponent {
  constructor () {
    super()

    this.state = {
      visible: true
    }
    this.hide = this.hide.bind(this)
    this.updateComment = this.updateComment.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
  }

  hide () {
    this.props.stopEditCommentActionCreator()
  }

  updateComment (cb) {
    this.props.updateCommentActionCreator(Object.assign({}, this.props.comment, this.state.updated))
      .then(this.props.stopEditCommentActionCreator)
  }

  handleTextFieldChange (type) {
    return (text) => {
      let state
      if (this.state.updated) {
        state = {
          updated: {
            ...this.state.updated,
            [type]: text
          }
        }
      } else {
        state = {
          updated: {
            [type]: text
          }
        }
      }

      this.setState(state)
    }
  }

  render () {
    const { visible } = this.state
    const classes = 'md-cell md-cell--12'

    const actions = []
    actions.push({ secondary: false, children: 'Cancel', onClick: this.hide })
    actions.push(<Button flat primary onClick={this.updateComment}>Confirm</Button>)

    return (
      <div>
        <DialogContainer
          id='edit-comment-dialog'
          title='Edit comment'
          visible={visible}
          actions={actions}
          onHide={this.hide}
          initialFocus='author'
          focusOnMount={true}
          containFocus={true}
          contentClassName='md-grid'
        >
          <TextField id='author' label='Author' className={classes} value={this.state.updated ? this.state.updated.author : this.props.comment.author} onChange={this.handleTextFieldChange('author')} />
          <TextField id='body' label='Comment' rows={2} className={classes} value={this.state.updated ? this.state.updated.body : this.props.comment.body} onChange={this.handleTextFieldChange('body')} />
        </DialogContainer>
      </div>
    )
  }
}

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  stopEditCommentActionCreator: PropTypes.func.isRequired,
  updateCommentActionCreator: PropTypes.func.isRequired
}

const mapStateToProps = ({comments}, {commentId}) => {
  return {
    comment: Object.assign({}, comments.find(c => c.id === commentId))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCommentActionCreator: (comment) => updateComment(dispatch, comment),
    stopEditCommentActionCreator: () => stopEditComment(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditComment)
