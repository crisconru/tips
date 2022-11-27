import React, { useContext } from 'react';
import UserContext from './UserContext';

const LoginScreen = () => {
  const {setUser} = useContext(UserContext)
  const loginUser = () => setUser({
      id: 1234,
      name: 'Klin',
      email: 'klin@klin.es'
  })
  return (
    <>
      <h1>LoginScreen</h1>
      <hr/>
      <button className='btn btn-primary' onClick={loginUser}>Iniciar sesion</button>
    </>
  )
}

export default LoginScreen