import React from 'react'
import Person from './Person'

const PersonTable = ({ persons, filter, remove, changePersons, message }) => {

    const filteredPersons = () => {
        return (
            persons.filter(person =>
                person.name.toLowerCase()
                    .startsWith(filter.toLowerCase())
            )
        )
    }

    const removePerson = (id, name) => {
        return () => {
            if (window.confirm(`Poistetaanko henkilö ${name} luettelosta?`)) {
                remove(id).then(removed => {
                    const newPersons = persons.filter(person => person.id !== id)
                    changePersons(newPersons)
                })
                message(`Poistettiin henkilö ${name}`)
                setTimeout(() => {
                    message(null)
                }, 5000)
            }
        }
    }

    return (
        <table>
            <tbody>
                {filteredPersons().map(person => <Person key={person.name} person={person} remove={removePerson(person.id, person.name)} />)}
            </tbody>
        </table>
    )
}

export default PersonTable