import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercices: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercices: 7
  }
  const part3 = {
    name: 'State of a component',
    exercices: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Part title={part1.name} amount={part1.exercices} />
      <Part title={part2.name} amount={part2.exercices} />
      <Part title={part3.name} amount={part3.exercices} />
      <Total amount={part1.exercices + part2.exercices + part3.exercices} />
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
