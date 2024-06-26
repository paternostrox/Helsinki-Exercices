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

app.get('/info', (request, response) => {

  const time = new Date()
  Person.find({})
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

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
  .then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, 
  { new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})


