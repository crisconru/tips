import { Ejercicio, Seccion } from '../../components/Seccion'
import Padre from './Padre'

const SubiendoEstado = () => {
  return (
    <Seccion texto='Subiendo el Estado'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <Padre />
      </Ejercicio>
    </Seccion>
  )
}

export default SubiendoEstado