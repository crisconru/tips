import '@testing-library/jest-dom'

import { getGifs } from '../../helpers/getGifs'

describe('Pruebas con getGifs Fetch', () => {
  test('debe de traer 5 elementos', async () => {
    const gifs = await getGifs('spiderman')
    expect(gifs.length).toBe(5)
  })

  test('debe de tener un tamaño 0', async () => {
    const gifs = await getGifs('')
    expect(gifs.length).toBe(0)
  })
})
