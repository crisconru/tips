import React from 'react';

interface State {
  users: string[]
}

class Users extends React.Component {
  state: Readonly<State> = {
    users: ['Papa', 'Pepe']
  }

  componentDidMount() {
    this.setState((state: State) => ({users: [...state.users, 'Pipi']}))
  }

  componentWillUnmount() {
    console.log('¡Componente destruido!')
  }

  render() {
    return (
      <>
        <p>Users: {this.state.users}</p>
      </>
    )
  }
}

export default Users