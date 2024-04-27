import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const port = 3000

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('hey')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://localhost:${port}/notes`)
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const handleAddNote = (event) => {
    event.preventDefault()
    let currentNoteObj = {
      content: currentNote,
      important: Math.random() > 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(currentNoteObj))
    setCurrentNote('')
  }

  const handleNoteChange = (event) => {
    setCurrentNote(event.target.value)
  }

  const notesToShow = showAll ? notes 
  : notes.filter(note => note.important) 

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={handleAddNote}>
        <input value={currentNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App