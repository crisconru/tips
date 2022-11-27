import { createUser } from "./Objeto"

describe('Mi generador de objetos', () => {
    test('Crea objeto igual al que se manda', () => {
        const objeto = {name: 'Perico', age: 22}
        const nuevoObjeto = createUser(objeto.name, objeto.age)
        expect(nuevoObjeto).toHaveProperty('name', objeto.name)
        expect(nuevoObjeto).toHaveProperty('age', objeto.age)
        expect(nuevoObjeto).toEqual(objeto)
    })
})