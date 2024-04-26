import { useState } from 'react'
import _ from 'lodash'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddName = (e) => {
    e.preventDefault()
    let isDuplicate = persons.reduce((acc, person) => acc = acc || person.name == newName, false)
    if(isDuplicate) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      let newPerson = {
        name: newName 
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)} 
      </ul>
    </div>
  )
}

export default App