import { Seccion, Ejercicio } from '../../components/Seccion'
import Users from './Users'
import Seconds from './Seconds'
import Tasks from './Tasks'

const CicloDeVida = () => {
  return (
    <Seccion texto='Ciclo de Vida'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <Users />
      </Ejercicio>
      {/* Ejercicio 2 */}
      <Ejercicio texto='Ejercicio 2'>
        <Seconds />
      </Ejercicio>
      {/* Ejercicio 3 */}
      <Ejercicio texto='Ejercicio 3'>
        <Tasks />
      </Ejercicio>
    </Seccion>
  )
}

export default CicloDeVida