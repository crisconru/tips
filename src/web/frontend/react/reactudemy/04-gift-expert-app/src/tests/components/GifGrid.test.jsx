import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import { GifGrid } from '../../components/GifGrid'

import { useFetchGifs } from '../../hooks/useFetchGifs'

jest.mock('../../hooks/useFetchGifs')

describe('Pruebas para <GifGrid />', () => {
  const category = 'spiderman'
  let wrapper
  const gifs = [
    { id: 'ABC', url: 'http://localhost/algo.jpg', title: 'Cosa' },
    { id: 'DEF', url: 'http://localhost/algo.jpg', title: 'Cosa' }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    useFetchGifs.mockReturnValue({
      data: [],
      loading: true
    })
    wrapper = shallow(<GifGrid category={category} />)
  })

  test('Debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('Debe de mostrar items cuando se cargan imagenes useFetchgifs', () => {})
  useFetchGifs.mockReturnValue({
    data: gifs,
    loading: false
  })
  wrapper = shallow(<GifGrid category={category} />)
  // expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('p').exists()).toBe(false)
  expect(wrapper.find('GifGridItem').length).toBe(gifs.length)
})
