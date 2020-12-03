import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === '') {
    return null
  }
  return (
    <Alert bsStyle='info'>
      <div>{notification}</div>
    </Alert>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)