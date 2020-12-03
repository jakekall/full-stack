import React from 'react'
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
    this.props.addBlog(this.state.title, this.state.author, this.state.url)
    this.setState({ title: '', author: '', url: '' })
  }

  render() {
    return (
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            title
          <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            author
          <input
              type='text'
              name='author'
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            url
          <input
              type='text'
              name='url'
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default BlogForm