const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const getPeople = () => {
  Person.find({})
    .then(res => {
      console.log('Puhelinluettelo:')
      res.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}

const addPerson = (person) => {
  person.save()
    .then(() => {
      console.log(`Lisätään henkilö ${person.name} numero ${person.number}`)
      mongoose.connection.close()
    })
}

if (process.argv[2] === undefined) {
  getPeople()
} else {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  addPerson(person)
}