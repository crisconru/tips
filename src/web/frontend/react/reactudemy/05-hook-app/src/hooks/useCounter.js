import { useState } from 'react';

const useCounter = (initialstate = 10) => {
  const [counter, setCounter] = useState(initialstate)

  const increment = (factor = 1) => {
    setCounter(counter + factor)
  }

  const decrement = (factor = 1) => {
    setCounter(counter - factor)
  }

  const reset = () => setCounter(initialstate)

  return {
    counter,
    increment,
    decrement,
    reset
  }
}

export default useCounter
