import React from 'react'
import { setProductsByDescendingPrince, priceColor } from './utils'

interface Product {
  id: number,
  name: string,
  price: number
}

interface State {
  products: Product[]
}

export default class ProductsPage extends React.Component {
  state: Readonly<State> = {
    products: [
      {
        id: 1,
        name: 'Chachopo',
        price: 30,
      },
      {
        id: 3,
        name: 'Navajas',
        price: 25,
      },
      {
        id: 2,
        name: 'Chorizo a la sidra',
        price: 15,
      }
    ]
  }

  changeOrderByPrice = () => {
    //Should order all products by price in descending order
    this.setState((state: State) => {products: setProductsByDescendingPrince(state.products)})
  }

  getPriceColor = (price: number) => {
    // price > 25 should return red
    // price > 15 and price <= 25 should return orange
    // In any other case return green
    return priceColor(price)
  }

  render() {
    return (
      <>
        <h1>Products</h1>
        <button onClick={this.changeOrderByPrice}>Change order</button>
        {this.state.products.map(product => (
          <div key={product.id} style={{color: this.getPriceColor(product.price)}}>
            {product.name} - {product.price}
          </div>
        ))}
      </>
    )
  }
}