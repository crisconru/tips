import React from 'react'
import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react-hooks'

import { useFetchGifs } from '../../hooks/useFetchGifs'

describe('Pruebas en useFetchGifs', () => {
  test('Debe de retornar el estado inicial', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchGifs('Spiderman'))
    const { loading, data: images } = result.current
    await waitForNextUpdate()
    expect(images).toEqual([])
    expect(loading).toBe(true)
  })

  test('Debe de retornar un array de imgs y el loading a false', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchGifs('Spiderman'))
    await waitForNextUpdate()
    const { loading, data: images } = result.current
    expect(images.length).toBe(5)
    expect(loading).toBe(false)
  })
})
