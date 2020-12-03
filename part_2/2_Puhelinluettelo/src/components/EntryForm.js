import React from 'react'

const EntryForm = ({ persons, name, number, nameHandler, numberHandler, resetState, newPerson, create, update, message }) => {

    const addPerson = (event) => {
        event.preventDefault()

        const found = persons.find(person => person.name === name)

        const person = {
            name,
            number
        }

        if (found) {
            if (window.confirm(`${name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                update(found.id, person)
                    .then(person => {
                        const list = persons.filter(p => p.id !== found.id)
                        newPerson(list.concat(person))
                    })
                    .catch(error => {
                        console.log(error)
                        create(person)
                            .then(p => {
                                newPerson(persons.concat(p))
                            })
                    })
                message(`Muutettiin henkilön ${name} numero`)
                setTimeout(() => {
                    message(null)
                }, 5000)

            }
            resetState()
            return
        }

        create(person)
            .then(p => {
                newPerson(persons.concat(p))
            })
            .catch(err => {
                console.log(err)
                resetState()
                return
            })
        resetState()

        message(`Lisättiin henkilö ${name}`)
        setTimeout(() => {
            message(null)
        }, 5000)
    }


    return (
        <form onSubmit={addPerson}>
            <div>
                nimi:
                <input
                    value={name}
                    onChange={nameHandler}
                />
            </div>
            <div>
                numero:
                <input
                    value={number}
                    onChange={numberHandler}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default EntryForm