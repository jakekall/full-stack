import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const { data } = useQuery(ME)
  const skip = !data?.me
  const genre = skip ? null : data.me.favoriteGenre
  const { data: bookData } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip,
  })

  if (!show || !bookData) {
    return null
  }

  const books = bookData.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>{`books in your favorite genre ${data.me.favoriteGenre}`}</p>
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
    </div>
  )
}

export default Recommend
