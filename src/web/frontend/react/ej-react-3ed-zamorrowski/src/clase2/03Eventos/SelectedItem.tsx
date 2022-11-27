import { useState } from 'react';

const opciones = [
  'Primera opción',
  'Segunda opción',
  'Tercera opción',
  'Cuarta opción'
]

const SelectedItem = () => {
  const [selected, setSelected] = useState<number>(0)
  const handleSelected = (index: number) => setSelected(index)
  return (
    <>
    <ul>
      {opciones.map((opcion, index) => <li key={index} onClick={() => handleSelected(index + 1)}>{opcion}</li>)}
    </ul>
    <h2>{selected > 0 ? `Opción ${selected}` : 'Escoge una opción'}</h2>
    </>
  )
}

export default SelectedItem