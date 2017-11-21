import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText, Button } from 'react-md'
import Moment from 'react-moment'
import { withRouter } from 'react-router-dom'

import { loadPost, voteDownPost, voteUpPost } from '../../actions/posts'

class Post extends PureComponent {
  constructor () {
    super()

    this.voteUp = this.voteUp.bind(this)
    this.voteDown = this.voteDown.bind(this)
  }

  componentDidMount () {
    this.props.loadPostActionCreator(this.props.postId, this.props.history)
  }

  componentWillReceiveProps (nextProps) {
    (this.props.postId === nextProps.postId) || this.post.loadPostActionCreator(nextProps.postId, this.props.history)
  }

  voteDown () {
    this.props.voteDownPostActionCreator(this.props.postId, true)
  }

  voteUp () {
    this.props.voteUpPostActionCreator(this.props.postId, true)
  }

  render () {
    return (
      <Card className='md-cell--12-tablet md-cell md-cell--12 md-paper md-paper--1'>
        <CardTitle title={this.props.post.title || ''} subtitle={`Author: ${this.props.post.author}`} />
        <CardText>
          <Button icon iconClassName='material-icons' onClick={this.voteDown} >favorite_border</Button><span className='vote-score-card-text'>{this.props.post.voteScore}</span><Button icon iconClassName='material-icons' onClick={this.voteUp}>favorite</Button>
          <h6>Published on: <Moment format='YYYY/MM/DD HH:MM'>{this.props.post.timestamp}</Moment></h6>
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
  loadPostActionCreator: PropTypes.func.isRequired,
  voteDownPostActionCreator: PropTypes.func.isRequired,
  voteUpPostActionCreator: PropTypes.func.isRequired
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
    loadPostActionCreator: (postId, history) => loadPost(dispatch, postId, () => history.push('/notfound')),
    voteDownPostActionCreator: (postId, isDetails) => voteDownPost(dispatch, postId, isDetails),
    voteUpPostActionCreator: (postId, isDetails) => voteUpPost(dispatch, postId, isDetails)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post))
