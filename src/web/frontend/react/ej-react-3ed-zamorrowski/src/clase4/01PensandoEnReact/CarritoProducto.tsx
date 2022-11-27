import {Product} from './Types'

type DataProduct = {
  product: Product
  addProduct: boolean,
  removeProduct: boolean,
  onAddProduct: (name: string) => void,
  onRemoveProduct: (name: string) => void
}

export const CarritoProducto = (props: DataProduct) => {
  const {name, price, img} = props.product
  return (
    <>
      {img && <img src={img} alt={name}/>}
      <span><strong>{name}</strong> - {price} €</span>
      <button
        disabled={!props.addProduct}
        onClick={() => props.onAddProduct(name)}
      >
        Añadir
      </button>
      <button
        disabled={!props.removeProduct}
        onClick={() => props.onRemoveProduct(name)}
      >
        Quitar
      </button>
    
    </>
  )
}

export default CarritoProducto