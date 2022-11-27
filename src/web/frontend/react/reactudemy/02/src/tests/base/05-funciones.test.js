import '@testing-library/jest-dom'

import { getUser, getUsuarioActivo } from '../../base/05-funciones'

describe('Pruebas de 05-funciones', () => {
    test('Test getUser', () => {
        const user = getUser()
        const userTest = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        }
        expect(user).toEqual(userTest)
    })

    test('Test getUsuarioActivo', () => {
        const nombre = 'Cristo'
        const usuario = getUsuarioActivo(nombre)
        const usuariotest = {
            uid: 'ABC567',
            username: nombre
        }
        expect(usuario).toEqual(usuariotest)
    })
})