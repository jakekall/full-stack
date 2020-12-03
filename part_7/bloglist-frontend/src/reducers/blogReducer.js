import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      let id = action.data.id
      const blogToChange = state.find(b => b._id === id)
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
      return state.map(blog => blog._id !== id ? blog : changedBlog)
    case 'DELETE_BLOG':
      id = action.data.id
      return state.filter(b => b._id !== id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const changedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogService.update(changedBlog, blog._id)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: blog._id }
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog._id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id: blog._id }
    })
  }
}

export default blogReducer