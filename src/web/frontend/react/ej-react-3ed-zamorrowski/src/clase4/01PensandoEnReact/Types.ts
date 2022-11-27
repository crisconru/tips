export interface Product {
    name: string,
    price: number,
    img?: string,
    stock: number
}

export interface ChartProduct extends Product{
    quantity: number
}