import { useState } from "react"
import Escaparate from "./Escaparate"
import Carrito from "./Carrito"
import { Product } from "./Types"
import './Tienda.css'

const initialProducts = [
  {name: 'Patines', price: 10, stock: 7},
  {name: 'Monopatines', price: 30, stock: 3},
  {name: 'Patinetes', price: 15, stock: 2},
]

export const TiendApp = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const handleAddProduct = (productName: string) => {
    console.log(`Add product ${productName}`)
  }
  const handleRemoveProduct = (productName: string) => {
    console.log(`Remove product ${productName}`)
  }
  return (
    <>
      <h1>Tienda</h1>
      {/* <div className="tienda">
        <Escaparate />
        <Carrito products={products}/>
      </div> */}
    </>
  )
}

export default TiendApp