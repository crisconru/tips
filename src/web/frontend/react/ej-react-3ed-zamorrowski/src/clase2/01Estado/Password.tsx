import React from 'react';

interface State {
  show: boolean
}

class Password extends React.Component {
  state: Readonly<State> = {
    show: false
  }

  showPassword() {
    this.setState((state: State) => ({ show: !state.show}))
  }

  render() {
    // console.log(this.state.show)
    
    return (
      <>
        <input type={this.state.show ? 'text' : 'password'}/>
        <button onClick={() => this.showPassword()}>
          {this.state.show ? 'Ocultar password' : 'Mostrar password'}
        </button>
      </>
    )
  }
}

export default Password