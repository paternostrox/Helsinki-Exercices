import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Part title={part1} amount={exercises1} />
      <Part  title={part2} amount={exercises2}  />
      <Part title={part3} amount={exercises3} />
      <Total amount={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.title} {props.amount}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.amount}</p>
  )
}

export default App
