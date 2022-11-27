import { useState } from 'react'
import CarritoProducto from './CarritoProducto'
import { Product } from './Types'


type Props = {
  products: Product[],
}

const Carrito = ({products}: Props) => {
  const [prods, setProds] = useState<Product[]>(products)
  const onAddProduct = (name: string) => {
    console.log(`onAddProduct ${name}`)
  }

  const onRemoveProduct = (name: string) => {
    console.log(`onRemoveProduct ${name}`)
  }

  return (
    <div className='carrito'>
      <h1>Carrito</h1>
        {prods.map(
          prod => 
            <CarritoProducto
              product={prod}
              addProduct={true}
              removeProduct={true}
              onAddProduct={onAddProduct}
              onRemoveProduct={onRemoveProduct}
            />
        )}
    </div>
  )
}

export default Carrito