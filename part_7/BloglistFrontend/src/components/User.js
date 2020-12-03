import React from 'react'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  return (
    <Panel>
      <Panel.Heading>
        <h2>{user.name}</h2>
      </Panel.Heading>
      <Panel.Body>
        <h3>Added blogs</h3>
      </Panel.Body>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroupItem key={blog._id}>
            {blog.title} by {blog.author}
          </ListGroupItem>
        )}
      </ListGroup>
    </Panel>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User