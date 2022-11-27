import React, { useContext } from 'react'
import UserContext from './UserContext'

const AboutScreen = () => {
  const {user, setUser} = useContext(UserContext)
  const logoutUser = () => setUser({})
  return (
    <>
      <h1>AboutScreen</h1>
      <hr/>
      <pre>{JSON.stringify(user, null, 3)}</pre>
      <button className='btn btn-primary' onClick={logoutUser}>Logout</button>
    </>
  )
}

export default AboutScreen