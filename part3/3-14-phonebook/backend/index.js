require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Phonebook Backend</h1>')
})

app.get('/api/info', (request, response) => {

  const time = new Date()
  const persons = Person.find({})
  .then(persons => {
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${time}</p>
    `)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id)
  .then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
  .then(deletedPerson => {
    console.log(deletedPerson)
    if(deletedPerson) {
      response.json(deletedPerson)
    } else {
      response.status(204).end()
    }
  })
  .catch(error => next(error))
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})


