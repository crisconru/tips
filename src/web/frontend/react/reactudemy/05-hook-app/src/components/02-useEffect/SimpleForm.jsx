import React, { useEffect, useState } from "react"
import "./effects.css"
import Message from "./Message"

const SimpleForm = () => {
  const [formState, setFormState] = useState({ name: "", email: "" })

  const { name, email } = formState

  // Cuando carga por primera vez el componente
  useEffect(() => {
    //console.log("hey")
  }, [])

  // Cuando se modifica el formState, vuelve a renderizar el componente
  useEffect(() => {
    //console.log("formState cambio")
  }, [formState])
  
  // Cuando se modifica el email, vuelve a renderizar el componente
  useEffect(() => {
    //console.log("email cambio")
  }, [email])

  const handleInputChange = ({ target }) => {
    
    setFormState({
      ...formState,
      [target.name]: target.value,
    })
  }

  return (
    <>
      <h1>useEffects</h1>
      <hr />

      <div className="from-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Tu nombre"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
      </div>

      <div className="from-group">
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="poia@gmail.com"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
      </div>

      { (name === '123') && <Message /> }
    </>
  );
};

export default SimpleForm;
