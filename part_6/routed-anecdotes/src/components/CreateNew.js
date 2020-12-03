import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.notify(`a new anecdote '${this.state.content}' created!`, 10)
  }

  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content</ControlLabel>
            <FormControl
              name='content'
              value={this.state.content}
              onChange={this.handleChange}
            />
            <ControlLabel> author</ControlLabel>
            <FormControl
              name='author'
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>url for more info</ControlLabel>
            <FormControl
              name='info'
              value={this.state.info}
              onChange={this.handleChange}
            />
            <Button bsStyle='success' type='submit'>create</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default CreateNew