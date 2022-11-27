import { SyntheticEvent, useRef, useState } from "react"

const clave = 'A tope con React'

const ATopeReact = () => {

  const [validacion, setValidacion] = useState<string>('')
  const campo = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (campo.current !== null) {
      const mensaje = campo.current.value !== clave ? 'ERROR' : 'Correcto sæcio'
      setValidacion(mensaje)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={campo} type='text' />
      </form>
      <p>{validacion}</p>
    </>
  )
}
export default ATopeReact
