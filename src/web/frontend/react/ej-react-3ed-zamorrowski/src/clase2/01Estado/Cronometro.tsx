import React from 'react';

interface State {
  stop: boolean,
  pause: boolean,
  seconds: number
}

class Cronometro extends React.Component {
  state: Readonly<State> = {
    stop: true,
    pause: false,
    seconds: 0 
  }

  interval?: ReturnType<typeof setInterval> | null = null

  startInterval = () => {
    if (this.interval === null) {
      this.interval = setInterval(() => {
        this.setState((state: State) => ({seconds: state.seconds + 1}))
      }, 1000)
    }
  }

  stopInterval = () => {
      clearInterval(this.interval)
      this.interval = null
  }

  resetSeconds = () => this.setState({seconds: 0})

  render() {
    return (
      <>
        <p>Segundos: {this.state.seconds}</p>
        <button onClick={this.startInterval}>{this.state.seconds === 0 ? 'Empezar' : 'Continuar'}</button>
        <button onClick={this.stopInterval}>Parar</button>
        <button onClick={this.resetSeconds}>Reset</button>
      </>
    )
  }
}

export default Cronometro