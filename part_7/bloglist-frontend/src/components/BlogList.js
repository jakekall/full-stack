import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

class BlogList extends React.Component {

  render() {
    return (
      <div>
        <h2>Blogs</h2>
        <ListGroup >
          {this.props.blogs.sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <ListGroupItem key={blog._id}>
                <Link to={`/blogs/${blog._id}`} >{blog.title} by {blog.author}</Link>
              </ListGroupItem>
            )}
        </ListGroup>
      </div>
    )
  }
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps
)(BlogList)