import { useState } from 'react';

interface Props {
  texto?: string,
  fondo?: string,
  colorTexto?: string,
  children?: any
}

const CollapsableSeccion = ({texto, fondo, colorTexto, children}: Props) => {
  const [collapse, setCollapse] = useState(true)
  const toggleCollape = () => setCollapse(!collapse)
  return <>
    <h1 style={{backgroundColor: fondo, color: colorTexto}} onClick={toggleCollape}>{texto}</h1>
    <div style={{display: collapse ? 'none' : 'block'}}>
      {children}
    </div>
  </>
}

export const Clase = ({texto, children}: Props) => <CollapsableSeccion texto={texto} fondo='black' colorTexto='white' children={children}/>
export const Seccion = ({texto, children}: Props) => <CollapsableSeccion texto={texto} fondo='red' colorTexto='black' children={children}/>
export const Ejercicio = ({texto, children}: Props) => <CollapsableSeccion texto={texto} fondo='green' colorTexto='white' children={children}/>
