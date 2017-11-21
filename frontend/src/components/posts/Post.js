import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'react-md'
import Moment from 'react-moment'
import { withRouter } from 'react-router-dom'

import { loadPost } from '../../actions/posts'

class Post extends PureComponent {
  componentDidMount () {
    this.props.loadPostActionCreator(this.props.postId, this.props.history)
  }

  componentWillReceiveProps (nextProps) {
    (this.props.postId === nextProps.postId) || this.post.loadPostActionCreator(nextProps.postId, this.props.history)
  }

  render () {
    return (
      <Card className='md-cell--8-tablet md-cell md-cell--6 md-paper md-paper--1'>
        <CardTitle title={this.props.post.title || ''} subtitle={`Author: ${this.props.post.author}`} />
        <CardText>
          <h6>Published on: <Moment format='YYYY/MM/DD HH:MM'>{this.props.post.timestamp}</Moment>, Vote: {this.props.post.voteScore}</h6>
          <p>
            {this.props.post.body}
          </p>
        </CardText>
      </Card >
    )
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.string
  }),
  history: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  loadPostActionCreator: PropTypes.func.isRequired
}

Post.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = ({post}) => {
  return {
    post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostActionCreator: (postId, history) => loadPost(dispatch, postId, () => history.push('/notfound'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post))
