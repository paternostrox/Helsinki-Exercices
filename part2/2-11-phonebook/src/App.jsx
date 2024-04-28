import axios from 'axios'
import { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchPersonField from './components/SearchPersonField'
import PersonList from './components/PersonList'

const port = 3000

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:${port}/persons`)
    .then((response => {
      setPersons(response.data)
    }))
  }, [])

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