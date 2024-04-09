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
      <Content title1={part1} amount1={exercises1} title2={part2} amount2={exercises2} title3={part3} amount3={exercises3} />
      <Total amount={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <p>{props.title1} {props.amount1}</p>
      <p>{props.title2} {props.amount2}</p>
      <p>{props.title3} {props.amount3}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.amount}</p>
  )
}

export default App
