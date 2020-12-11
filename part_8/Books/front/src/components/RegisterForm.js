import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const RegisterForm = ({ show }) => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setfavoriteGenre] = useState('')

  const [register] = useMutation(CREATE_USER)

  const submit = async (event) => {
    event.preventDefault()

    register({
      variables: { username, favoriteGenre },
    })
    setUsername('')
    setfavoriteGenre('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          favorite genre{' '}
          <input
            type="favorite genre"
            value={favoriteGenre}
            onChange={({ target }) => setfavoriteGenre(target.value)}
          />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default RegisterForm
