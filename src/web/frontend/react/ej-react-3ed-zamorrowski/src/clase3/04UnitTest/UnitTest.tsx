import { Ejercicio, Seccion } from "../../components/Seccion"
import ProductsPage from "./ProductsPage"

const UnitTest = () => {
  return (
    <Seccion texto='Unit Test y TDD'>
      {/* Ejercicio 1 */}
      <Ejercicio texto='Ejercicio 1'>
        <ProductsPage />
      </Ejercicio>
    </Seccion>
  )
}

export default UnitTest