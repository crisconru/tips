import { Ejercicio, Seccion } from '../../components/Seccion'
import Enfocado from './Enfocado'
import Pintar from './Pintar'
import Seleccionado from './Seleccionado'
import SelectedItem from './SelectedItem'

const Eventos = () => {
  return (
    <Seccion texto='Gestión de eventos'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <Pintar />
      </Ejercicio>
      {/* Ejercicio 2 */}
      <Ejercicio texto='Ejercicio 2'>
        <SelectedItem />
      </Ejercicio>
      {/* Ejercicio 3 */}
      <Ejercicio texto='Ejercicio 3'>
        <Enfocado />
      </Ejercicio>
      {/* Ejercicio 4 */}
      <Ejercicio texto='Ejercicio 4'>
        <Seleccionado />
      </Ejercicio>
    </Seccion>
  )
}

export default Eventos