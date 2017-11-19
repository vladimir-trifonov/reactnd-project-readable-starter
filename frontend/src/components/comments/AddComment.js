import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, DialogContainer, TextField } from 'react-md'
import { addComment } from '../../actions/comments'
import uuid from 'js-uuid'

class AddComment extends PureComponent {
  constructor() {
    super()

    this.state = { visible: false }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.addComment = this.addComment.bind(this)
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this)
  }

  show() {
    this.setState({ visible: true })
  }

  hide() {
    this.setState({ visible: false })
  }

  addComment(cb) {
    return () => {
      this.props.addCommentActionCreator({
        id: uuid.v4(),
        author: this.state.author || 'Anonymous',
        body: this.state.comment,
        parentId: this.props.postId,
        timestamp: new Date().getTime()
      })
        .then(() => {
          this.setState({
            comment: ''
          })
        })
        .then(cb)
    }
  }

  _handleTextFieldChange(type) {
    return (text) => {
      this.setState({
        [type]: text
      })
    }
  }

  render() {
    const { visible } = this.state

    const actions = []
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide })
    actions.push(<Button flat primary onClick={this.addComment(this.hide)}>Confirm</Button>)

    return (
      <div>
        <Button onClick={this.show} style={{ position: 'fixed', bottom: '20px', right: '20px' }} floating tooltipLabel='Add comment' tooltipPosition='top'>add</Button>
        <DialogContainer
          id='add-comment-dialog'
          title='Add comment'
          visible={visible}
          actions={actions}
          onHide={this.hide}
          initialFocus='comment'
          focusOnMount='true'
          containFocus='true'
          contentClassName='md-grid'
        >
          <TextField id='author' label='Author' className='md-cell md-cell--12' defaultValue='Anonymous' value={this.state.author} onChange={this._handleTextFieldChange('author')} />
          <TextField id='comment' label='Comment' rows={2} className='md-cell md-cell--12' value={this.state.comment} onChange={this._handleTextFieldChange('comment')} />
        </DialogContainer>
      </div>
    )
  }
}

AddComment.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    addCommentActionCreator: (comment) => addComment(dispatch, comment)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment)
