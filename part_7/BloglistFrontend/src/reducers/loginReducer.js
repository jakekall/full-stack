import blogService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      const user = action.data
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      return user
    case 'LOGOUT':
      window.localStorage.removeItem('loggedBloglistUser')
      return null
    case 'LOGIN_WITH_TOKEN':
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
      if (!loggedUserJSON) {
        return null
      }
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      return loggedUser
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const loginWithToken = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_WITH_TOKEN'
    })
  }
}

export default loginReducer