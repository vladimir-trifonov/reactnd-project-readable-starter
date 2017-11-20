import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, DialogContainer, TextField, SelectField } from 'react-md'
import { updatePost, stopEditPost } from '../../actions/posts'

class EditPost extends PureComponent {
  constructor() {
    super()

    this.state = {
      visible: true
    }
    this.hide = this.hide.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
  }

  hide() {
    this.props.stopEditPostActionCreator()
  }

  updatePost(cb) {
    this.props.updatePostActionCreator(this.props.category, Object.assign({}, this.props.post, this.state.updated))
      .then(this.props.stopEditPostActionCreator)
  }

  handleTextFieldChange(type) {
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

  render() {
    const { visible } = this.state
    const classes = 'md-cell md-cell--12'

    const actions = []
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide })
    actions.push(<Button flat primary onClick={this.updatePost}>Confirm</Button>)

    return (
      <div>
        <Button onClick={this.show} style={{ position: 'fixed', bottom: '20px', right: '20px' }} floating tooltipLabel='Edit post' tooltipPosition='top'>edit</Button>
        <DialogContainer
          id='edit-post-dialog'
          title='Edit post'
          visible={visible}
          actions={actions}
          onHide={this.hide}
          initialFocus='title'
          focusOnMount='true'
          containFocus='true'
          contentClassName='md-grid'
        >
          <SelectField
            id='select-category'
            placeholder='Category'
            className={classes}
            menuItems={this.props.categories}
            position={SelectField.Positions.BELOW}
            simplifiedMenu='true'
            itemLabel='name'
            itemValue='path'
            onChange={this.handleTextFieldChange('category')}
            value={(this.state.updated && this.state.updated.category) ? this.state.updated.category : this.props.post.category}
          />
          <TextField id='author' label='Author' className={classes} defaultValue='Anonymous' value={this.state.updated ? this.state.updated.author : this.props.post.author} onChange={this.handleTextFieldChange('author')} />
          <TextField id='title' label='Title' className={classes} value={this.state.updated ? this.state.updated.title : this.props.post.title} onChange={this.handleTextFieldChange('title')} />
          <TextField id='body' label='Post' rows={2} className={classes} value={this.state.updated ? this.state.updated.body : this.props.post.body} onChange={this.handleTextFieldChange('body')} />
        </DialogContainer>
      </div>
    )
  }
}

EditPost.propTypes = {}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    post: Object.assign({}, state.posts.find(c => c.id === ownProps.postId))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePostActionCreator: (currentCategory, post) => updatePost(dispatch, currentCategory, post),
    stopEditPostActionCreator: () => stopEditPost(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost)
