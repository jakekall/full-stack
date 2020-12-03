import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(credentials)
    this.setState({ username: '', password: '' })
  }

  render() {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>username:</ControlLabel>
            <FormControl
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
            <ControlLabel>password:</ControlLabel>
            <FormControl
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
            <Button bsStyle='success' type='submit'>login</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(
  null,
  { login }
)(LoginForm)