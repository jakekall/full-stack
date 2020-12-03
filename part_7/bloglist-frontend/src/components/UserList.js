import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

class UserList extends React.Component {

  render() {
    return (
      <div>
        <h2>Users</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user =>
              <tr key={user._id}>
                <td><Link to={`/users/${user._id}`} >{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)