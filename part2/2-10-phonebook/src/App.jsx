import { useState } from 'react'

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
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      search: <input value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
      <ul>
        {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)} 
      </ul>
    </div>
  )
}

export default App