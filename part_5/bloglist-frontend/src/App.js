import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = async (title, author, url) => {
    const blogObject = {
      title,
      author,
      url
    }

    try {
      let newBlog = await blogService.create(blogObject)
      newBlog.user = this.state.user
      this.setState({ blogs: this.state.blogs.concat(newBlog) })
      this.setNotification(`a new blog '${title}' by ${author} added`, 4000)

    }
    catch (e) {
      console.log(e)
    }
  }

  updateBlog = async (blog) => {
    const blogObject = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogService.update(blogObject, blog._id)
      blog.likes++
      this.setState(this.state.blogs)
    } catch (error) {
      console.log(error)
    }
  }

  removeBlog = async (blog) => {
    try {
      await blogService.remove(blog._id)
      this.setState({ blogs: this.state.blogs.filter(b => b._id !== blog._id) })
    } catch (error) {
      console.log(error)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  setNotification = (message, time) => {
    this.setState({ notification: message })
    setTimeout(() => {
      this.setState({ notification: null })
    }, time)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (error) {
      console.log(error)
      this.setNotification('wrong username or password', 4000)
      this.setState({ username: '', password: '' })
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    this.setState({ user: null })
  }

  render() {
    if (this.state.user === null) {
      return (
        <Togglable buttonLabel='login'>
          <Notification message={this.state.notification} />
          <LoginForm
            login={this.login}
            handleFieldChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </Togglable>
      )
    }

    return (
      <>
        <h1>Blogs</h1>
        <Notification message={this.state.notification} />
        <p>{this.state.user.name} logged in
        <button onClick={this.logout}>logout</button>
        </p>
        <Togglable buttonLabel='create new blog'>
          <BlogForm
            addBlog={this.addBlog}
            setNotification={this.setNotification}
          />
        </Togglable>
        {this.state.blogs.sort((a, b) => {
          return b.likes - a.likes
        }).map(blog =>
          <Blog
            key={blog._id}
            blog={blog}
            update={this.updateBlog}
            remove={this.removeBlog}
            username={this.state.user.username}
          />
        )}
      </>
    )
  }
}

export default App;