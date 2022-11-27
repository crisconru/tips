import { Seccion, Ejercicio } from '../../components/Seccion'
import Select from './Select'
import ATopeReact from './ATopeReact'
import UserPass from './UserPass'
import Formularido from './Formularido'

const Formularios = () => {
  return (
    <Seccion texto='Formularios'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <Select items={['Pepe', 'Domingo', 'Castaño']} value='Domingo' onChange={({target}) => console.log(target.value)}/>
      </Ejercicio>
      {/* Ejercicio 2 */}
      <Ejercicio texto='Ejercicio 2'>
        <ATopeReact />
      </Ejercicio>
      {/* Ejercicio 3 */}
      <Ejercicio texto='Ejercicio 3'>
        <UserPass />
      </Ejercicio>
      {/* Ejercicio 4 */}
      <Ejercicio texto='Ejercicio 4'>
        <UserPass fuerza={true}/>
      </Ejercicio>
      {/* Ejercicio 5 */}
      <Ejercicio texto='Ejercicio 5'>
        <Formularido />
      </Ejercicio>
    </Seccion>
  )
}

export default Formularios