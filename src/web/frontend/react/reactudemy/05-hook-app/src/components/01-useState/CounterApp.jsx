import React, { useState } from 'react'
import './counter.css'

const CounterApp = () => {
  const [state, setState] = useState({ counter1: 10, counter2: 10});
  const { counter1, counter2 } = state
  return (
    <>
      <h1>Counter {counter1}</h1>
      <h1>Counter {counter2}</h1>
      <hr />
      <button 
        className="btn btn-primary"
        onClick={() => {
            setState({ ...state, counter1: counter1 + 1})
        }}
      >
        +1
      </button>
      <button 
        className="btn btn-primary"
        onClick={() => {
            setState({ ...state, counter2: counter2 + 1 })
        }}
      >
        +1
      </button>
    </>
  )
}

export default CounterApp
