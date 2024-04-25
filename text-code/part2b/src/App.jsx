import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [currentNote, setCurrentNote] = useState('hey')
  const [showAll, setShowAll] = useState(true)

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