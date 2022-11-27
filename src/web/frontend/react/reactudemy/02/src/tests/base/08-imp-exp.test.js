import { getHeroeById, getHeroesByOwner } from '../../base/08-imp-exp';
import heroes from '../../data/heroes'


describe('Pruebas de 08-imp-exp', () => {
    test('Test getHeroById -> debe devolver un heroe', () => {
        const id = 1
        const heroe = getHeroeById(id)
        const heroeTest = heroes.find(h => h.id)
        expect(heroe).toEqual(heroeTest)
    })

    test('Test getHeroById -> debe devolver undefined', () => {
        const id = 100
        const heroe = getHeroeById(id)
        expect(heroe).toBe(undefined)
    })

    test('Test getHeroByOwner -> debe devolver heroes de DC', () => {
        const owner = 'DC'
        const heroes = getHeroesByOwner(owner)
        const heroesTest = heroes.filter(h => h.owner === owner)
        expect(heroes).toEqual(heroesTest)
    })

    test('Test getHeroByOwner -> debe devolver heroes de Marvel', () => {
        const owner = 'Marvel'
        const heroes = getHeroesByOwner(owner)
        const heroesTest = heroes.filter(h => h.owner === owner)
        //expect(heroes).toEqual(heroesTest)
        expect(heroes.length).toBe(2)
    })
})