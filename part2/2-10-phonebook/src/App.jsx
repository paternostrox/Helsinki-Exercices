import { useState } from 'react'
import { nanoid } from 'nanoid'

const App = () => {
  const [persons, setPersons] = useState([
    { id: nanoid(), name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddName = (e) => {
    e.preventDefault()
    let newPerson = {
      id: nanoid(),
      name: newName 
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
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
        {persons.map(person => <li key={person.id}>{person.id} | {person.name}</li>)} 
      </ul>
    </div>
  )
}

export default App