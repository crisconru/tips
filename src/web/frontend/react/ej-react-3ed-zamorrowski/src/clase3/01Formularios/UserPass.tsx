import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import FuerzaDelPassword from './FuerzaDelPassword';

interface State {
  username: string,
  password: string
}

const initialState: State = {
    username: '',
    password: ''
}

const checkLength = (elem: string, len: number) => elem.length >= len

const checkUsername = (e: string) => checkLength(e, 1)
const checkPassword = (e: string) => checkLength(e, 8)

export const UserPass = ({fuerza = false}) => {
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [invalid, setInvalid] = useState(true)
  const [passToStrength, setPassToStrength] = useState('')


  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value)
    if (username.current !== null && password.current !== null) {
      const tmpInvalid = (checkUsername(username.current.value) && checkPassword(password.current.value)) ? false : true
      if (tmpInvalid !== invalid) setInvalid(tmpInvalid)
      if (e.target.value === password.current.value) setPassToStrength(password.current.value)
    }
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username.current !== null && password.current !== null) {
      console.log(`username: ${username.current.value}\npassword: ${password.current.value}`)
    }
  }

  return <>
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <input ref={username} type="text" name="username"/>
      <input ref={password} type="password" name="password"/>
      <input type="submit" value="Mandar" disabled={invalid}/>
    </form>
    {fuerza && <FuerzaDelPassword password={passToStrength}/>}
  </>
}

export default UserPass
