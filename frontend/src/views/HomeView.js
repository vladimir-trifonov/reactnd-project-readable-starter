import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Categories, AddPost, Posts } from '../components'

class HomeView extends PureComponent {
  render () {
    return (
      <div>
        <div className='md-grid md-cell--6'>
          <Categories />
          <Posts />
        </div>
        <AddPost />
      </div>
    )
  }
}

HomeView.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
