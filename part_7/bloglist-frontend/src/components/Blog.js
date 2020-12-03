import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Panel, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Blog extends React.Component {

  handleLikeButton = (blog) => () => {
    this.props.likeBlog(blog)
  }

  handleDeleteButton = (blog) => () => {
    if (window.confirm(`delete '${blog.title}' by ${blog.author}`)) {
      this.props.removeBlog(blog)
      this.props.history.push('/')
    }
  }

  render() {
    const blog = this.props.blog
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass='h2'>{blog.title}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <a href={blog.url}>{blog.url}</a>
          <div>{blog.likes} <Button bsStyle='success' bsSize='small' onClick={this.handleLikeButton(blog)}>like</Button></div>
          <div>added by {blog.user.name}</div>
          {this.props.loggedUser.name === blog.user.name ?
            <Button bsStyle='danger' bsSize='small' onClick={this.handleDeleteButton(blog)}>delete</Button> : null}
        </Panel.Body>
      </Panel>
    )
  }
}

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { likeBlog, removeBlog }
)(Blog)