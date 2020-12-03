import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, handleFieldChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          username
            <input
            type='text'
            name='username'
            value={username}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          password
            <input
            type='password'
            name='password'
            value={password}
            onChange={handleFieldChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm