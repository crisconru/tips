import Title from './Title'
import Text from './Text'
import List from './List'
import ListItem from './ListItem'
import Link from './Link'


const Ejercicio = () => {
  return (
    <>
      <Title title={'Necesito partir en componentes todo esto'} />
      <Text text={'Para ello puedo usar React que me permitirá poder reutilizar todos esos componentes. Para ello tengo que:'} />
      <List>
        <ListItem content={'Observar el HTML'} />
        <ListItem content={'Pensar en como puedo extraer cada trozo en componentes'} />
        <ListItem content={'Usarlos en React'} />
      </List>
      <Link to={'https://reactjs.org/'} text={'React Docs'} />
      <br />
      <Link to={'https://reactjs.org/'} text={'React Docs (new window)'} openInNewTab={true}/>
      <br />
    
    </>
  )
}

export default Ejercicio