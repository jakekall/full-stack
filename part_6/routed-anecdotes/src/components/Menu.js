import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => (
  <div style={menuStyle}>
    <NavLink exact to='/' style={linkStyle} activeStyle={activeStyle}>anecdotes</NavLink>
    <NavLink exact to='/create' style={linkStyle} activeStyle={activeStyle}>create new</NavLink>
    <NavLink exact to='/about' style={linkStyle} activeStyle={activeStyle}>about</NavLink>
  </div>
)

const menuStyle = {
  backgroundColor: 'lightblue',
  padding: '10px 5px',
  borderBottomStyle: 'solid'
}

const linkStyle = {
  margin: 8
}

const activeStyle = {
  fontWeight: "bold",
  color: "black"
}

export default Menu