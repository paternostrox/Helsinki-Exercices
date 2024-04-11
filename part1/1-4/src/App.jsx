import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercices: 10
      },
      {
        name: 'Using props to pass data',
        exercices: 7
      },
      {
        name: 'State of a component',
        exercices: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <p>{props.parts[0].name} {props.parts[0].exercices}</p>
      <p>{props.parts[1].name} {props.parts[1].exercices}</p>
      <p>{props.parts[2].name} {props.parts[2].exercices}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercices + props.parts[1].exercices + props.parts[2].exercices}</p>
  )
}

export default App
