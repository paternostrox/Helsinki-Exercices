import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const port = 3000

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get(`http://localhost:${port}/notes`)
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const handleAddNote = (event) => {
    event.preventDefault()
    let currentNoteObj = {
      content: currentNote,
      important: Math.random() > 0.5,
    }
    
    axios.post(`http://localhost:${port}/notes`, currentNoteObj)
    .then(response => {
      setNotes(notes.concat(response.data))
      setCurrentNote('')
    })
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