import { Ejercicio, Seccion } from "../../components/Seccion"
import StyledButton from "./StyledButton"



const StyledComponents = () => {
  return (
    <Seccion texto='Styled-Components'>
      <Ejercicio texto="Ejercicio 1">
        <StyledButton />
      </Ejercicio>
    </Seccion>
  )
}

export default StyledComponents