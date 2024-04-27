import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

const port = 3000

axios.get(`http://localhost:${port}/notes`)
.then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})