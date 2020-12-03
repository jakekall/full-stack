const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

morgan.token('data', (req) => {
  return JSON.stringify(req.body)
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(Person.format(person))
    })
    .catch(err => {
      console.log(err)
      res.status(404).end()
    })
})

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      res.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(() => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === '' || body.number === '') {
    return res.status(400).send({ error: 'missing name or number' })
  }

  Person.find({ name: body.name })
    .then(result => {
      if (!result[0]) {
        const person = new Person({
          name: body.name,
          number: body.number
        })

        person.save()
          .then(result => {
            res.status(201).json(result)
          })
          .catch(err => {
            console.log(err)
            res.status(500).end()
          })
      } else {
        res.status(409).send({ error: 'resource already exists' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  const person = {
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})