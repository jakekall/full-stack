import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: false
    }
  }

  toggleInfo = () => {
    this.setState({ info: !this.state.info })
  }

  handleLikeButton = (event) => {
    this.props.update(this.props.blog)
  }

  handleDeleteButton = (event) => {
    if (window.confirm(`delete '${this.props.blog.name}' by ${this.props.blog.author}`)) {
      this.props.remove(this.props.blog)
    }
  }

  render() {
    const { blog, username } = this.props

    const extraInfo = () => (
      <div className='details'>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} <button onClick={this.handleLikeButton}>like</button></div>
        <div>added by {blog.user.name}</div>
        {blog.user.username === username ? <button onClick={this.handleDeleteButton}>delete</button> : null}
      </div>
    )

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div className='basics'>
          <span className='title' onClick={this.toggleInfo}>{blog.title}</span> by {blog.author}
        </div>
        {this.state.info ? extraInfo() : null}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog