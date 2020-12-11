import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('')
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks({ variables: { genre } })
  }, [genre, getBooks])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>
      <p>{`in genre ${genre ? genre : 'all'}`}</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenre('refactoring')}>refactoring</button>
      <button onClick={() => setGenre('agile')}>agile</button>
      <button onClick={() => setGenre('patterns')}>patterns</button>
      <button onClick={() => setGenre('design')}>design</button>
      <button onClick={() => setGenre('crime')}>crime</button>
      <button onClick={() => setGenre('classic')}>classic</button>
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
