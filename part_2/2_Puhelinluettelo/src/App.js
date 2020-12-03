import React from 'react'
import FilterForm from './components/FilterForm'
import EntryForm from './components/EntryForm'
import PersonTable from './components/PersonTable'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  resetState = () => {
    this.setState({
      newName: '',
      newNumber: ''
    })
  }

  changeMessage = (message) => {
    this.setState({
      message
    })
  }

  changePersons = (persons) => {
    this.setState({
      persons
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.message} />
        <FilterForm
          persons={this.state.persons}
          filter={this.state.filter}
          handler={this.handleFilterChange}
        />
        <h2>Lisää uusi</h2>
        <EntryForm
          persons={this.state.persons}
          name={this.state.newName}
          number={this.state.newNumber}
          nameHandler={this.handleNameChange}
          numberHandler={this.handleNumberChange}
          resetState={this.resetState}
          newPerson={this.changePersons}
          create={personService.create}
          update={personService.update}
          message={this.changeMessage}
        />
        <h2>Numerot</h2>
        <PersonTable
          changePersons={this.changePersons}
          persons={this.state.persons}
          filter={this.state.filter}
          remove={personService.remove}
          message={this.changeMessage}
        />
      </React.Fragment>
    )
  }
}

export default App