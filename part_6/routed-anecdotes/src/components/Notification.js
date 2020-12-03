import React from 'react'

const Notification = ({ message }) => {
  return (
    message === '' ? null :
    <div style={notificationStyle}>{message}</div>
  )
}

const notificationStyle = {
  color: 'black',
  fontWeight: "bold",
  backgroundColor: 'lightblue',
  border: 'thick solid',
  padding: 5,
  marginTop: 10,
  marginBottom: 5
}

export default Notification