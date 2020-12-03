import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_YEAR_BORN } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [yearBorn, setYearBorn] = useState('')

  const [changeYearBorn] = useMutation(EDIT_YEAR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeYearBorn({
      variables: { name: author, setBornTo: parseInt(yearBorn) },
    })

    setAuthor('')
    setYearBorn('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            <option value="" selected disabled hidden>
              Choose author
            </option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="year born"
            value={yearBorn}
            onChange={({ target }) => setYearBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
