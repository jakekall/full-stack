import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <React.Fragment>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </React.Fragment>
  )
}
const Otsikko = (props) => {
  return (
    <React.Fragment>
      <h1>{props.kurssi}</h1>
    </React.Fragment>
  )
}
const Sisalto = (props) => {
  return (
    <React.Fragment>
      {props.osat.map((osa, index) =>
        <Osa nimi={osa.nimi} tehtavia={osa.tehtavia} key={index}></Osa>
      )}
    </React.Fragment>
  )
}
const Osa = (props) => {
  return (
    <React.Fragment>
      <p>{props.nimi} {props.tehtavia}</p>
    </React.Fragment>
  )
}
const Yhteensa = (props) => {
  let tehtavia = 0

  props.osat.forEach(osa => {
    tehtavia += osa.tehtavia
  })
  return (
    <React.Fragment>
      <p>yhteensä {tehtavia} tehtävää</p>
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)