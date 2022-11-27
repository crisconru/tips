import React from "react"
import useCounter from '../../hooks/useCounter'
import './counter.css'

const CounterWithCustomHook = () => {

  const {state, increment, decrement, reset } = useCounter(15)
  return (
    <>
      <h1>Counter with hook: { state }</h1>
      {/* 
      <button className="btn btn-primary" onClick={increment}>+1</button>
      <button className="btn btn-primary" onClick={decrement}>-1</button>
      */}
      <button className="btn btn-primary" onClick={() => increment(2)}>+2</button>
      <button className="btn btn-primary" onClick={ reset }>Reset</button>
      <button className="btn btn-primary" onClick={() => decrement(2)}>-2</button>
    </>
  )
}

export default CounterWithCustomHook
