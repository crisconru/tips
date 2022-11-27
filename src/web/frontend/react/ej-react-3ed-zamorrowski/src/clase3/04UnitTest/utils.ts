export interface Product {
    id: number,
    name: string,
    price: number
}

const compareProducts = (a: Product, b: Product) => {
  if (a.price < b.price) return -1
  if (a.price > b.price) return 1
  return 0
}

export const setProductsByDescendingPrince = (products: Product[]) => [...products].sort(compareProducts)

export const priceColor = (price: number) => {
  if (price > 25) return 'red'
  if (price > 15) return 'orange'
  return 'green'
}