import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div id='user-feedback'>
        <h2>give feedback:</h2>
        <Button text='good' onClick={() => setGood(good + 1)} />
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
        <Button text='bad' onClick={() => setBad(bad + 1)} />
      </div>
      <div id='statistics'>
        <h2>statistics</h2>
        <Counter text='good' value={good} />
        <Counter text='neutral' value={neutral} />
        <Counter text='bad' value={bad} />
      </div>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Counter = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

export default App