import { useState } from 'react';

const Logueado = () => {
  const [isLogged, setIsLogged] = useState(false)
  const toggleLog = () => setIsLogged(!isLogged)
  return <>
    <button type='button' onClick={toggleLog}>{isLogged ? 'Logout' : 'Login'}</button>
    <span>{isLogged ? 'Esta pagina solo puedo verla por que estoy logueado' : 'Inicia sesión para ver contenido privado'}</span>
  </>
}
export default Logueado