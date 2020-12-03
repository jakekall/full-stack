import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            points: [0, 0, 0, 0, 0, 0]
        }
    }
    randomAnecdote = () => this.setState({ selected: Math.floor(Math.random() * anecdotes.length) })

    addPoint = () => {
        const copy = [...this.state.points]
        copy[this.state.selected]++
        this.setState({ points: copy })
    }
    mostPoints = () => {
        const points = this.state.points
        let max = 0, index = 0
        for (let i = 0; i < points.length; i++) {
            if (points[i] > max) {
                max = points[i]
                index = i
            }
        }
        return index
    }

    render() {
        const mostPoints = this.mostPoints()
        return (
            <React.Fragment>
                <h1>Anecdote</h1>
                <p>{anecdotes[this.state.selected]}</p>
                <p>has {this.state.points[this.state.selected]} votes</p>
                <button onClick={this.addPoint}>vote</button>
                <button onClick={this.randomAnecdote}>next anecdote</button>
                <h1>Anecdote with most votes:</h1>
                <p>{anecdotes[mostPoints]}</p>
                <p>has {this.state.points[mostPoints]} votes</p>
            </React.Fragment>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App />, document.getElementById('root'))