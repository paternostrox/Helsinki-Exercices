import axios from 'axios'
import { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchPersonField from './components/SearchPersonField'
import PersonList from './components/PersonList'
import pbService from './services/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    pbService.getPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  let filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(searchString.toLowerCase())
  )

  const handleAddPerson = (e) => {
    e.preventDefault()

    let newPerson = {
      name: newName,
      number: newNumber,
    }

    let personId = persons.find(person => person.name == newName)?.id

    if(personId) {
      if(window.confirm(`${newName} is already added to the phonebook. Replace the old number?`)) {
        pbService.updatePerson(personId, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== personId ? person : updatedPerson))
        })
      }
    }
    else {
      pbService.addNewPerson(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleRemovePerson = (id) => {
    let person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`))
    pbService.removePerson(id)
    .then(removedPerson => {
      setPersons(persons.filter(person => 
        person.id !== removedPerson.id
      ))
    })
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
      <PersonList persons={filteredPersons} handleDelete={handleRemovePerson} />
    </div>
  )
}

export default App