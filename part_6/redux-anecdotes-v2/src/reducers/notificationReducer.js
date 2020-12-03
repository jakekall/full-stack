const initialState = 'Testi viesti'

const notificationReducer = (store = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return store
  }
}

export const addNotification = (message) => {
  console.log(message)
  return {
    type: 'CREATE_NOTIFICATION',
    message
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export const notify = (message, time) => {
  return (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer