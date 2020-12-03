import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE_ANECDOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE_ANECDOTE':
      return [...store, action.data]
    default:
      return store
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      id: anecdote.id
    })
  }
}

export default anecdoteReducer