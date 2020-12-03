import React from 'react'
import { Panel } from 'react-bootstrap'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <Panel>
        <Panel.Body><h2>{anecdote.content} by {anecdote.author}</h2>
          <div>Has {anecdote.votes} votes</div>
          <div>For more info see <a href={anecdote.info}>{anecdote.info}</a></div></Panel.Body>
      </Panel>
    </div>
  )
}

export default Anecdote