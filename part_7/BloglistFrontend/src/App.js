import React from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginWithToken } from './reducers/loginReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PageHeader } from 'react-bootstrap'
import PropTypes from 'prop-types'

class App extends React.Component {

  componentDidMount() {
    this.props.loginWithToken()
    this.props.initializeBlogs()
    this.props.initializeUsers()
  }

  findById = (array, id) =>
    array.find(a => a._id === id)

  appView = () => (
    <>
      <Menu />
      <Route exact path='/' render={() =>
        <div>
          <Togglable buttonLabel='create new blog'>
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>}
      />
      <Route exact path='/users' render={() =>
        <UserList />}
      />
      <Route exact path='/users/:id' render={({ match }) =>
        <User user={this.findById(this.props.users, match.params.id)} />}
      />
      <Route exact path='/blogs/:id' render={({ match, history }) =>
        <Blog blog={this.findById(this.props.blogs, match.params.id)} history={history} />}
      />
    </>
  )

  loginFormView = () => (
    <Togglable buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  render() {
    return (
      <Router>
        <div className='container'>
          <PageHeader>Blog App</PageHeader>
          <Notification />
          {this.props.loggedUser === null ?
            this.loginFormView() : this.appView()}
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  loginWithToken: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { initializeUsers, initializeBlogs, loginWithToken }
)(App)