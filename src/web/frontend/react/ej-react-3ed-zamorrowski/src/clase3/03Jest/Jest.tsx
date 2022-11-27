import { Ejercicio, Seccion } from "../../components/Seccion"

const Jest = () => {
  return (
    <Seccion texto='Jest'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <p>Mirar el fichero <strong>Colors.ts</strong> y <strong>Colors.test.ts</strong></p>
      </Ejercicio>
      {/* Ejercicio 2 */}
      <Ejercicio texto='Ejercicio 2'>
        <p>Mirar el fichero <strong>Colors.ts</strong> y <strong>Colors.test.ts</strong></p>
      </Ejercicio>
      {/* Ejercicio 3 */}
      <Ejercicio texto='Ejercicio 3'>
        <p>Mirar el fichero <strong>Objeto.ts</strong> y <strong>Objeto.test.ts</strong></p>
      </Ejercicio>
    </Seccion>
  )
}

export default Jest