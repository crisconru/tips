import React from 'react';

interface State {
  caracter: string,
  sigCaracter: string,
  cadena: string
}

class Cadena extends React.Component {
  state: Readonly<State> = {
    caracter: 'a',
    sigCaracter: 'b',
    cadena: 'a'
  }

  nextChar = (c: string) => String.fromCharCode(c.charCodeAt(0) + 1)

  prevChar = (c: string) => String.fromCharCode(c.charCodeAt(0) - 1)

  increment() {
    const siguiente = this.nextChar(this.state.caracter)
    const sisiguiente = this.nextChar(siguiente)
    this.setState(
      (state: State) => (
        {
          caracter: siguiente,
          sigCaracter: sisiguiente,
          cadena: state.cadena + siguiente
        }
      )
    )
  }

  decrement() {
    const anterior = this.state.cadena.length > 0 ? String.fromCharCode(this.state.caracter.charCodeAt(0) - 1) : 'a'
    this.setState(
      (state: State) => (
        {
          caracter: anterior,
          sigCaracter: state.caracter,
          cadena: state.cadena.length > 0 ? state.cadena.slice(0, -1) : 'a'
        }
      )
    )
  }

  render() {
    return (
      <>
        <p>String: {this.state.cadena}</p>
        <button onClick={() => this.increment()}>Añadir {this.state.sigCaracter}</button>
        {this.state.cadena !== 'a' && <button onClick={() => this.decrement()}>Quitar {this.state.caracter}</button>}
      </>
    )
  }
}

export default Cadena