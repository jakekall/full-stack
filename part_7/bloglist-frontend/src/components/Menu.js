import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Menu = (props) => (
  <div style={menuStyle}>
    <NavLink exact to='/' style={linkStyle} activeStyle={activeStyle}>blogs</NavLink>
    <NavLink exact to='/users' style={linkStyle} activeStyle={activeStyle}>users</NavLink>
    <em style={textStyle}>{props.loggedUser.name} logged in</em>
    <Button onClick={props.logout}>logout</Button>
  </div>
)

const textStyle = {
  margin: 8
}

const menuStyle = {
  backgroundColor: 'lightblue',
  padding: '10px 5px',
  borderBottomStyle: 'solid'
}

const linkStyle = {
  margin: 8
}

const activeStyle = {
  fontWeight: 'bold',
  color: 'black'
}

Menu.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { logout }
)(Menu)