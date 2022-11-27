//import '@testing-library/jest-dom'

import { retornaArreglo } from '../../base/07-deses-arr'

describe('Pruebas 07-deses-arr.js', () => {
    test('Test retornaArreglo', () => {
        const arreglo = retornaArreglo()
        const arregloTest = ['ABC', 123]
        expect(arreglo).toEqual(arregloTest)
    })
    test('Test retornaArreglo devuelve un string y un numero', () => {
        const [letras, numeros] = retornaArreglo()
        //expect(letras).toBe('ABC')
        expect(typeof letras).toBe('string')
        //expect(numeros).toBe(123)
        expect(typeof numeros).toBe('number')
    })
})