import { useState } from "react"

const Enfocado = () => {
  const [enfocado, setEnfocado] = useState('')
  const focusIn = () => setEnfocado('Dentro')
  const focusOut = () => setEnfocado('Fuera')
  return <input type='text' onFocus={focusIn} onBlur={focusOut} value={enfocado}/>
}

export default Enfocado