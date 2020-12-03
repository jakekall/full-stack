import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistics = () => {
  const state = store.getState()
  const total = state.good + state.ok + state.bad

  if (total === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>
              {Math.round((state.good - state.bad) / total * 10) / 10}
            </td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{Math.round(state.good / total * 1000) / 10} %</td>
          </tr>
        </tbody>
      </table>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  click = (type) => () => {
    store.dispatch({ type })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.click('GOOD')}>hyvä</button>
        <button onClick={this.click('OK')}>neutraali</button>
        <button onClick={this.click('BAD')}>huono</button>
        <Statistics />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)