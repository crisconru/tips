import {Product} from './Types'

type Products = {
    products: Product[]
}


const Escaparate = ({products}: Products) => {
  return (
    <>
      <h1>Escaparate</h1>
      <div className="escaparate">
      </div>
    </>
  )
}

export default Escaparate
