import { Ejercicio, Seccion } from '../../components/Seccion'
import Logueado from './Logueado'

const RenderizadoCondicional = () => {
  return (
    <Seccion texto='Renderizado Condicional'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <Logueado />
      </Ejercicio>
    </Seccion>
  )
}

export default RenderizadoCondicional