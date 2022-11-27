import React, { ChangeEvent, useState } from 'react';
import ColorPicker from './ColorPicker';
import TextoColorizado from './TextoColorizado';

const Padre = () => {
  const [color, setColor] = useState<string>('')
  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => setColor(target.value)
  return <>
    Soy el padre
    <ColorPicker color={color} onChange={handleChange} />
    <TextoColorizado color={color}/>
  </>
}

export default Padre
