import '@testing-library/jest-dom'

import { getSaludo } from '../../base/02-template-string'

describe('Pruebas para 02-template-strings', () => {
    test('getSaludo debe de devolver "Hola Cristo"', () => {
        const resultado = getSaludo('Cristo')
        const esperado = 'Hola Cristo'
        expect(resultado).toBe(esperado)
    })
})