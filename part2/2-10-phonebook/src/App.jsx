import { useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchPersonField from './components/SearchPersonField'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  let filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(searchString.toLowerCase())
  )

  const handleAddPerson = (e) => {
    e.preventDefault()
    let isDuplicate = persons.reduce((acc, person) => acc = acc || person.name === newName, false)
    if(isDuplicate) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      let newPerson = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm 
        handleAddPerson={handleAddPerson} 
        personName={newName} 
        setPersonName={setNewName} 
        personNumber={newNumber}
        setPersonNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <SearchPersonField 
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <PersonList persons={filteredPersons} />
    </div>
  )
}

export default App