const filterReducer = (store = '', action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.text
    default:
      return store
  }
}

export const updateFilter = (text) => {
  return {
    type: 'UPDATE_FILTER',
    text
  }
}

export default filterReducer