import React from 'react'

const Country = ({ country: { name, capital, population, flag } }) => {

    return (
        <React.Fragment>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <img src={flag} alt='flag' height={300} width={500} />
        </React.Fragment >
    )
}

export default Country