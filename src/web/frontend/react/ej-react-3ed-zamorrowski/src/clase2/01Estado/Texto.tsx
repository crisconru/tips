import React, {ChangeEvent} from 'react';

class Texto extends React.Component {
  state = {
      text: 'Hola'
  }

  updateText(e: ChangeEvent<HTMLInputElement>) {
    const loQueQuiero = e.target.value
    console.log(loQueQuiero)
      this.setState({ text: loQueQuiero})
  }

  render() {
    return (
      <>
        <h1>{this.state.text}</h1>
        <input type="text" onChange={(e) => this.updateText(e)}/>
      </>
    )
  }
}

export default Texto