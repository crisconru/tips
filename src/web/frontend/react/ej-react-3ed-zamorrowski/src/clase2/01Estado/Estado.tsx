import { Ejercicio, Seccion } from '../../components/Seccion'
import Cadena from './Cadena'
import Contador from './Contador'
import Cronometro from './Cronometro'
import Likes from './Likes'
import Password from './Password'
import Texto from './Texto'

const Estado = () => {
  return (
    <Seccion texto='Estado'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <Texto />
      </Ejercicio>
      {/* Ejercicio 2 */}
      <Ejercicio texto='Ejercicio 2'>
        <Password />
      </Ejercicio>
      {/* Ejercicio 3 */}
      <Ejercicio texto='Ejercicio 3'>
        <Contador />
      </Ejercicio>
      {/* Ejercicio 4 */}
      <Ejercicio texto='Ejercicio 4'>
        <Cadena />
      </Ejercicio>
      {/* Ejercicio 5 */}
      <Ejercicio texto='Ejercicio 5'>
        <Cronometro />
      </Ejercicio>
      {/* Ejercicio 6 */}
      <Ejercicio texto='Ejercicio 6'>
        <Likes />
      </Ejercicio>
      {/* Ejercicio 7 */}
      <Ejercicio texto='Ejercicio 7'>
        TODO (no se muy bien que hay que hacer)
      </Ejercicio>
    </Seccion>
  )
}

export default Estado