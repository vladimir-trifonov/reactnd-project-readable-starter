import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadPost } from '../../actions/posts'
import { Card, CardTitle, CardText } from 'react-md'

class Post extends PureComponent {
  componentDidMount() {
    this.props.loadPostActionCreator(this.props.postId)
  }

  componentWillReceiveProps(nextProps) {
    (this.props.postId === nextProps.postId) || this.post.loadPostActionCreator(nextProps.postId)
  }

  render() {
    return (
      <Card className='md-cell--8-tablet md-cell md-cell--6 md-paper md-paper--1'>
        <CardTitle title={this.props.post.title} subtitle={`Author: ${this.props.post.author}`} />
        <CardText>
          <h6>Published on: {this.props.post.timestamp}, Vote: {this.props.post.voteScore}</h6>
          <p>
            {this.props.post.body}
          </p>
        </CardText>
      </Card>
    )
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string
  })
}

const mapStateToProps = state => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostActionCreator: (postId) => loadPost(dispatch, postId)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
