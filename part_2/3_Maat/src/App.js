import React from 'react'
import axios from 'axios'
import Country from './components/Country'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      filter: ''
    }
  }
  
  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        this.setState({ countries: res.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleCountryClick = (event) => {
    this.setState({ filter: event.target.getAttribute('value') })
  }

  filterCountries = () => (
    this.state.countries.filter(country =>
      country.name.toLowerCase()
        .includes(this.state.filter.toLowerCase())
    )
  )

  listCountries = () => {
    const filtered = this.filterCountries()

    const list =
      filtered.length > 10 ?
        //over 10 countries
        <p>Too many matches, specify another filter</p> :
        filtered.length > 1 ?
          //between 10 and 1
          <ul>
            {filtered.map(country =>
              <li
                onClick={this.handleCountryClick}
                value={country.name}
                key={country.name}>
                {country.name}
              </li>)}
          </ul> :
          filtered.length === 1 ?
            //1 country
            <Country country={filtered[0]} /> :
            //0 countries
            <p>No matches</p>

    return list
  }

  render() {
    return (
      <React.Fragment>
        Find countries: <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        {this.state.filter === '' ? <div></div> : <div>{this.listCountries()}</div>}
      </React.Fragment>
    )
  }
}

export default App