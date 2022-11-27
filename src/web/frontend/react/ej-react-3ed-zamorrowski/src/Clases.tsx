import { Clase } from './components/Seccion';
import Clase1 from './clase1/Clase1';
import Clase2 from './clase2/Clase2';
import Clase3 from './clase3/Clase3';
import Clase4 from './clase4/Clase4';
import Clase5 from './clase5/Clase5';
import Clase6 from './clase6/Clase6';

const Clases = () => {
  return (
    <>
      {/* Clase 1 */}
      <Clase texto='CLASE 1'>
        <Clase1 />
      </Clase>
      {/* Clase 2 */}
      <Clase texto='CLASE 2'>
        <Clase2 />
      </Clase>
      {/* Clase 3 */}
      <Clase texto='CLASE 3'>
        <Clase3 />
      </Clase>
      {/* Clase 4 */}
      <Clase texto='CLASE 4'>
        <Clase4 />
      </Clase>
      {/* Clase 5 */}
      <Clase texto='CLASE 5'>
        <Clase5 />
      </Clase>
      {/* Clase 6 */}
      <Clase texto='CLASE 6'>
        <Clase6 />
      </Clase>
    </>
  )
}

export default Clases
