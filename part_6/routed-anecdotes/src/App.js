import React from 'react'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PageHeader } from 'react-bootstrap'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notify = (message, time) => {
    this.setState({ notification: message })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, time * 1000);
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <PageHeader>Software anecdotes</PageHeader>
          <Menu />
          <Notification message={this.state.notification} />
          <Route exact path='/' render={() =>
            <AnecdoteList anecdotes={this.state.anecdotes} />}
          />
          <Route path='/about' render={() =>
            <About />}
          />
          <Route path='/create' render={({ history }) =>
            <CreateNew addNew={this.addNew} history={history} notify={this.notify} />}
          />
          <Route path='/anecdotes/:id' render={({ match }) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App