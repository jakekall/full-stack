import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createNew } from '../reducers/blogReducer'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.props.createNew(blogObject)
    this.props.notify(`You added '${this.state.title}'`, 10000)
    this.setState({ title: '', author: '', url: '' })
  }

  render() {
    return (
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>title:</ControlLabel>
            <FormControl
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
            <ControlLabel>author:</ControlLabel>
            <FormControl
              type='text'
              name='author'
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
            <ControlLabel>url:</ControlLabel>
            <FormControl
              type='text'
              name='url'
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
            <Button bsStyle='success' type='submit'>create</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

BlogForm.propTypes = {
  createNew: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect(
  null,
  { notify, createNew }
)(BlogForm)