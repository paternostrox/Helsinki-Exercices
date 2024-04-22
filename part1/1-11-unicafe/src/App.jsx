import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div id='user-feedback'>
        <h2>give feedback</h2>
        <Button text='good' onClick={() => setGood(good + 1)} />
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
        <Button text='bad' onClick={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
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

const Statistics = ({good, neutral, bad}) => {
  
  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positivePercentage = (good / all) * 100;

  return (
    <div id='statistics'>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positivePercentage}%</p>
      </div>
  )
}

export default App