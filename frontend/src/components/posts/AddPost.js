import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-md'

const AddPost = () => {
  return (
    <Button style={{ position: 'fixed', bottom: '20px', right: '20px' }} floating tooltipLabel='Add post' tooltipPosition='top'>add</Button>
  )
}

AddPost.propTypes = {}

export default AddPost
