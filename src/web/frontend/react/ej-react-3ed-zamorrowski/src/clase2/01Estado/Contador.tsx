import React from 'react';

interface State {
  count: number
}

class Contador extends React.Component {
  state: Readonly<State> = {
    count: 0
  }

  increment() {
    this.setState((state: State) => ({ count: state.count + 1}))
  }

  decrement() {
    this.setState((state: State) => ({ count: state.count - 1}))
  }

  render() {
    return (
      <>
        <p>Contador: {this.state.count}</p>
        <button onClick={() => this.increment()}>+1</button>
        <button onClick={() => this.decrement()}>-1</button>
      </>
    )
  }
}

export default Contador