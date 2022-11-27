import { Ejercicio, Seccion } from '../../components/Seccion';
import TiendApp from './TiendApp';

const PensandoEnReact = () => {
  return (
    <Seccion texto='Pensando en React'>
      <Ejercicio texto='Ejercicio Gordo'>
          <TiendApp />
      </Ejercicio>
    </Seccion>
  )
}

export default PensandoEnReact