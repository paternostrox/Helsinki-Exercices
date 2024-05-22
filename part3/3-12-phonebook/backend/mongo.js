const mongoose = require('mongoose')

if(process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Program must be called with certain number of arguments (3 or 5). Maybe you are missing a password?')
  console.log('Arguments: ', process.argv)
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://pedropaternostro:${password}@cluster0.osbexjo.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
  Person.find({})
  .then(persons => {
    console.log('phonebook:')
    persons.map(person => 
      console.log(`${person.name} ${person.number}`)
    )
    mongoose.connection.close()
  })
}

if(process.argv.length === 5) {

  const person = new Person({
    name: process.argv[3], 
    number: process.argv[4]
  })

  person.save()
  .then(person => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}



