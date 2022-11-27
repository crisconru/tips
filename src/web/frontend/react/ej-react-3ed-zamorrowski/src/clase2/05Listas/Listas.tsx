import { Ejercicio, Seccion } from '../../components/Seccion'
import PintarUsuarios from './PintarUsuarios'
import PintarUsuariosNombre from './PintarUsuariosNombre'
import PintarCriptos from './PintarCriptos'
import PortfolioCrypto from './PortfolioCrypto'
import TodoApp from './TodoApp'

const Listas = () => {
  return (
    <Seccion texto='Pintando Listas'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <PintarUsuarios />
      </Ejercicio>
      {/* Ejercicio 2 */}
      <Ejercicio texto='Ejercicio 2'>
        <PintarUsuariosNombre />
      </Ejercicio>
      {/* Ejercicio 3 */}
      <Ejercicio texto='Ejercicio 3'>
        <PintarCriptos />
      </Ejercicio>
      {/* Ejercicio 4 */}
      <Ejercicio texto='Ejercicio 4'>
        <p style={{backgroundColor: 'red'}}>Algo del componente de Sergio no va bien</p>
        {/* <PortfolioCrypto /> */}
      </Ejercicio>
      {/* Ejercicio 5 */}
      <Ejercicio texto='Ejercicio 5'>
        <TodoApp />
      </Ejercicio>
    </Seccion>
  )
}

export default Listas