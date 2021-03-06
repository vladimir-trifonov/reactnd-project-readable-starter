import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, DialogContainer, TextField } from 'react-md'
import uuid from 'js-uuid'

import { addComment } from '../../actions/comments'

class AddComment extends PureComponent {
  constructor () {
    super()

    this.state = { visible: false }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.addComment = this.addComment.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
  }

  show () {
    this.setState({ visible: true })
  }

  hide () {
    this.setState({ visible: false })
  }

  addComment (cb) {
    return () => {
      this.props.addCommentActionCreator({
        id: uuid.v4(),
        author: this.state.author || 'Anonymous',
        body: this.state.body,
        parentId: this.props.postId,
        timestamp: new Date().getTime()
      })
        .then(() => {
          this.setState({
            body: ''
          })
        })
        .then(cb)
    }
  }

  handleTextFieldChange (type) {
    return (text) => {
      this.setState({
        [type]: text
      })
    }
  }

  render () {
    const { visible } = this.state
    const classes = 'md-cell md-cell--12'

    const actions = []
    actions.push({ secondary: false, children: 'Cancel', onClick: this.hide })
    actions.push(<Button flat primary onClick={this.addComment(this.hide)}>Confirm</Button>)

    return (
      <div>
        <Button onClick={this.show} className='add-btn' floating tooltipLabel='Add comment' tooltipPosition='top'>add</Button>
        <DialogContainer
          id='add-comment-dialog'
          title='Add comment'
          visible={visible}
          actions={actions}
          onHide={this.hide}
          initialFocus='author'
          focusOnMount={true}
          containFocus={true}
          contentClassName='md-grid'
        >
          <TextField id='author' label='Author' className={classes} value={this.state.author} onChange={this.handleTextFieldChange('author')} />
          <TextField id='body' label='Comment' rows={2} className={classes} value={this.state.body} onChange={this.handleTextFieldChange('body')} />
        </DialogContainer>
      </div>
    )
  }
}

AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
  addCommentActionCreator: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    addCommentActionCreator: (comment) => addComment(dispatch, comment)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddComment)
