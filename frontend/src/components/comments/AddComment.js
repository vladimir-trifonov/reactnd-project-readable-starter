import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-md'

const AddComment = () => {
  return (
    <Button style={{ position: 'fixed', bottom: '20px', right: '20px' }} floating tooltipLabel='Add comment' tooltipPosition='top'>add</Button>
  )
}

AddComment.propTypes = {}

export default AddComment
