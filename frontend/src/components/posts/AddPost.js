import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, DialogContainer, TextField, SelectField } from 'react-md'
import { addPost } from '../../actions/posts'
import uuid from 'js-uuid'

class AddPost extends PureComponent {
  constructor() {
    super()

    this.state = { visible: false }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.addPost = this.addPost.bind(this)
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this)
  }

  show() {
    this.setState({ visible: true })
  }

  hide() {
    this.setState({ visible: false })
  }

  addPost(cb) {
    return () => {
      this.props.addPostActionCreator(this.props.category, {
        id: uuid.v4(),
        title: this.state.title,
        author: this.state.author || 'Anonymous',
        body: this.state.post,
        category: this.state.category,
        timestamp: new Date().getTime()
      })
        .then(() => {
          this.setState({
            title: '',
            post: ''
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
    actions.push(<Button flat primary onClick={this.addPost(this.hide)}>Confirm</Button>)

    return (
      <div>
        <Button onClick={this.show} style={{ position: 'fixed', bottom: '20px', right: '20px' }} floating tooltipLabel='Add post' tooltipPosition='top'>add</Button>
        <DialogContainer
          id='add-post-dialog'
          title='Add post'
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
            className='md-cell md-cell--12'
            menuItems={this.props.categories}
            position={SelectField.Positions.BELOW}
            simplifiedMenu='true'
            itemLabel='name'
            itemValue='path'
            onChange={this._handleTextFieldChange('category')}
          />
          <TextField id='author' label='Author' className='md-cell md-cell--12' defaultValue='Anonymous' value={this.state.author} onChange={this._handleTextFieldChange('author')} />
          <TextField id='title' label='Title' className='md-cell md-cell--12' value={this.state.title} onChange={this._handleTextFieldChange('title')} />
          <TextField id='post' label='Comment' rows={2} className='md-cell md-cell--12' value={this.state.post} onChange={this._handleTextFieldChange('post')} />
        </DialogContainer>
      </div>
    )
  }
}

AddPost.propTypes = {}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPostActionCreator: (currentCategory, post) => addPost(dispatch, currentCategory, post)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost)
