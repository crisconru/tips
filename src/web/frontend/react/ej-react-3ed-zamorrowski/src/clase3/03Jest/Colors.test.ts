import {getColors, result} from "./Colors"

test('Existe el color azul', () => {
  const colors = getColors()
  const resultado = colors.includes('blue')
  expect(resultado).toBeTruthy()
})

test('Dos elementos y el blue no existe', () => {
  expect(result.length).toBe(2)
  expect(result).toHaveLength(2)
  expect(result.includes('blue')).toBeFalsy()
})