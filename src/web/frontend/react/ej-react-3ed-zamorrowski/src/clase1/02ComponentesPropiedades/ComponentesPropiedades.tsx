import { Seccion, Ejercicio as Ej } from "../../components/Seccion"
import Ejercicio from "./Ejercicio"
import Holi from "./Holi"
import Loading from "./Loading"
import LogProps from "./LogProps"

const ComponentesPropiedades = () => {
  return (
    <Seccion texto='Componentes y Propiedades'>
      {/* Ejercicio 1 */}
      <Ej texto='Ejercicio 1'>
        <Ejercicio />
      </Ej>
      {/* Ejercicio 2 */}
      <Ej texto='Ejercicio 2'>
        <Loading>
          <Ejercicio />
        </Loading>
        <hr />
        <Loading show={true} >
          <Ejercicio />
        </Loading>
      </Ej>
      {/* Ejercicio 3 */}
      <Ej texto='Ejercicio 3'>
        <Holi callback={() => console.log('holi')} />
      </Ej>
      {/* Ejercicio 4 */}
      <Ej texto='Ejercicio 4'>
        <LogProps colors={['red', 'green']} isActive={true} callBack={() => 1+1} numberOfColor={2} name={'Perico'}/>
      </Ej>
    </Seccion>
  )
}

export default ComponentesPropiedades