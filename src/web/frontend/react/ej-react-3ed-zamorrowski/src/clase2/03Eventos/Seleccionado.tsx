import { ChangeEvent, useState } from 'react';

const Seleccionado = () => {
  const [value, setValue] = useState<string>('')

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)

  return <>
    <select onChange={handleSelect}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
    <p>Seleccionado {value}</p>
  </>
}

export default Seleccionado