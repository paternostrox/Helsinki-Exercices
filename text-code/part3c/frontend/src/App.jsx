import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    noteService.getAllWithNonExisting()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const handleAddNote = (event) => {
    event.preventDefault()
    let currentNoteObj = {
      content: currentNote,
      important: Math.random() > 0.5,
    }
    
    noteService.create(currentNoteObj)
    .then(addedNote => {
      setNotes(notes.concat(addedNote))
      setCurrentNote('')
    })
  }

  const handleNoteChange = (event) => {
    setCurrentNote(event.target.value)
  }

  const handleToggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
    .then(updatedNote => {
      setNotes(notes.map(n => n.id !== id ? n : updatedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes 
  : notes.filter(note => note.important) 

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => handleToggleImportance(note.id)}
          />
        )}
      </ul>
      <form onSubmit={handleAddNote}>
        <input value={currentNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App