import { getHeroeByIdAsync } from '../../base/09-promesas';
import heroes from '../../data/heroes';

describe('Pruebas de 09-promesas', () => {
    test('getHeroeByIdAsync debe devolver un heroe async', (done) => {
        const id = 1
        getHeroeByIdAsync(id)
            .then(heroe => {
                expect(heroe).toEqual(heroes[0])
                done()
            })
    })

    test('getHeroeByIdAsync debe devolver un error si el heroe no existe', (done) => {
        const id = 100
        getHeroeByIdAsync(id)
            .catch(error => {
                expect(error).toBe('No se pudo encontrar el héroe')
                done()
            })
    })
})