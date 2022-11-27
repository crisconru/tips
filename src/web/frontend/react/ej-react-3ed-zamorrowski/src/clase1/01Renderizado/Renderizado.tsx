import { Ejercicio, Seccion } from '../../components/Seccion'
import Greeting from './Greeting'
import ShowName from './ShowName'
import ShowDate from './ShowDate'
import ShowMessage from './ShowMessage'
import ConditionalRender from './ConditionalRender'

const Renderizado = () => {
  return (
    <Seccion texto='Renderizado'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <Greeting />
      </Ejercicio>
      {/* Ejercicio 2 */}
      <Ejercicio texto='Ejercicio 2'>
        <ShowName user={{name: 'Cristo'}} />
      </Ejercicio>
      {/* Ejercicio 3 */}
      <Ejercicio texto='Ejercicio 3'>
        <ShowDate />
      </Ejercicio>
      {/* Ejercicio 4 */}
      <Ejercicio texto='Ejercicio 4'>
        <h2>ShowMessage Component show = true</h2>
        <ShowMessage showMessage={true} />
        <hr />
        <h2>ShowMessage Component show = false</h2>
        <ShowMessage showMessage={false} />
      </Ejercicio>
      {/* Ejercicio 5 */}
      <Ejercicio texto='Ejercicio 5'>
        <h2>ConditionalRender Component show = true</h2>
        <ConditionalRender show={true}>
            <ShowDate />
        </ConditionalRender>
        <hr />
        <h2>ConditionalRender Component show = false</h2>
        <ConditionalRender show={false}>
          <ShowDate />
        </ConditionalRender>
      </Ejercicio>
    </Seccion>
  )
}

export default Renderizado