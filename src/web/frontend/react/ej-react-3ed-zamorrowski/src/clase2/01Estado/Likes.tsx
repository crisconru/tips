import React from 'react';

interface State {
  likes: number
}

class Likes extends React.Component {
  state: Readonly<State> = {
    likes: 50,
  }
  addLike =  true

  handleClick = () => {
    const sumando = this.addLike ? 1 : -1
    this.setState(
      (state: State) => ({likes: state.likes + sumando}),
      () => {this.addLike = !this.addLike}
    )
  }

  render() {
    return (
      <>
        <p>Likes: {this.state.likes}</p>
        <button onClick={this.handleClick}>{this.addLike ? 'Like' : 'Dislike'}</button>
      </>
    )
  }
}

export default Likes