const limitX = 2
const limitY = 3
let arrayFor = []
for (let indexX = 0; indexX < limitX; indexX++) {
    const x = `x${indexX}`
    for (let indexY = 0; indexY < limitY; indexY++) {
        const y = `y${indexY}`
        arrayFor.push(x + y)
    }
}
console.log('array for')
console.log(arrayFor)

const arrayX = new Array(limitX).fill(1)
const arrayY = new Array(limitY).fill(1)

const arrayForEach = arrayX.map((_x, iX) => {
    const xx = `x${iX}`
    return arrayY.map((_y, iY) => {
        const yy = `y${iY}`
        return xx + yy
    })
}).flat()
console.log('array forEach')
console.log(arrayForEach)

// console.log(new Array(limitX))
// console.log(new Array(limitY))