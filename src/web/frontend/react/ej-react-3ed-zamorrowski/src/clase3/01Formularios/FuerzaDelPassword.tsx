const FuerzaDelPassword = ({password}) => {
  let points = 0
  if (password.length >= 8) points++
  if (/[0-9]/.test(password)) points++
  if (/[A-Z]/.test(password)) points++
  if (/[$%&/()+-]/.test(password)) points++
  let text = 'Introduzca argo shurmano'
  if(points >=4) {
    text = 'Contraseña fuerte'
  } else if(points >=2) {
    text = 'Contraseña normalica'
  } else if(points >= 1) {
    text = 'Contraseña débil'
  } else if (password.length === 0) {
    text = 'Introduzca argo shurmano'
  } else {
    text = 'Esa contraseña da pena'
  }
  return <p>{text}</p>
}

export default FuerzaDelPassword