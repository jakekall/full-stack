import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }
    lisaaPalaute = (palaute, arvo) => () => this.setState({[palaute] : arvo})

    yhteensa = () => this.state.hyva + this.state.neutraali + this.state.huono

    keskiarvo = () => {
        const keskiarvo = Math.round((this.state.hyva - this.state.huono) / this.yhteensa() * 10) / 10
        if (isNaN(keskiarvo)) {
            return 0
        }
        return keskiarvo
    }

    positiivisia = () => {
        const positiivisia = Math.round(this.state.hyva / this.yhteensa() * 1000) / 10
        if (isNaN(positiivisia)) {
            return 0
        }
        return positiivisia
    }

    show = () => this.state.hyva !== 0 || this.state.neutraali !== 0 || this.state.huono !== 0

    stats = () => [{
        text: 'hyvä',
        value: this.state.hyva
    },
    {
        text: 'neutraali',
        value: this.state.neutraali
    },
    {
        text: 'huono',
        value: this.state.huono
    },
    {
        text: 'keskiarvo',
        value: this.keskiarvo()
    },
    {
        text: 'positiivisia',
        value: this.positiivisia() + ' %'
    }]

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Anna palautetta</h1>
                    <Button handleClick={this.lisaaPalaute('hyva', this.state.hyva + 1)} text='hyvä' />
                    <Button handleClick={this.lisaaPalaute('neutraali', this.state.neutraali + 1)} text='neutraali' />
                    <Button handleClick={this.lisaaPalaute('huono', this.state.huono + 1)} text='huono' />
                </div>
                <div>
                    <h1>Statistiikka</h1>
                    <Statistics stats={this.stats()} show={this.show()} />
                </div>
            </React.Fragment>
        )
    }
}
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)
const Statistics = ({ stats, show }) => {
    if (show) {
        return (
            <table>
                <tbody>
                    {stats.map(stat =>
                        <Statistic key={stat.text} text={stat.text} value={stat.value} />
                    )}
                </tbody>
            </table>
        )
    }
    return (
        <p>Ei yhtään palautetta annettu</p>
    )
}
const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

ReactDOM.render(<App />, document.getElementById('root'))