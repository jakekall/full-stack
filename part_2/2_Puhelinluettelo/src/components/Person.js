import React from 'react'

const Person = ({ remove, person: { name, number } }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td><button onClick={remove}>poista</button></td>
        </tr>
    )
}

export default Person