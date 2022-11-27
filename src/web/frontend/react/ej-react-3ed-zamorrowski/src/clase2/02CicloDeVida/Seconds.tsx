import React from 'react';

interface State {
  seconds: number
}

class Users extends React.Component {
  state: Readonly<State> = {
    seconds: 0,
  }

  interval: ReturnType<typeof setInterval> | null = null

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state: State) => ({seconds: state.seconds + 1}))
    }, 1000)
  }

  componentWillUnmount() {
    console.log('¡Componente destruido!')
    clearInterval(this.interval)
    this.interval = null
  }

  render() {
    return (
      <>
        <p>Seconds: {this.state.seconds}</p>
      </>
    )
  }
}

export default Users