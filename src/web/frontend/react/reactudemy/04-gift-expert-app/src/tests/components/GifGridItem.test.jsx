import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'

import { GifGridItem } from '../../components/GifGridItem'

describe('Pruebas en <GifGridItem />', () => {
  const title = 'Un titulo'
  const url = 'http://localhost/algo.jpg'
  // const wrapper = shallow(<GifGridItem />)
  const wrapper = shallow(<GifGridItem title={title} url={url} />)

  test('Debe mostrar el componente correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('debe tener un parrafo con el titulo', () => {
    const p = wrapper.find('p')
    expect(p.text().trim()).toBe(title)
  })

  test('debe tener una img con la url y alt de los props', () => {
    const img = wrapper.find('img')
    expect(img.prop('src')).toBe(url)
    expect(img.prop('alt')).toBe(title)
  })

  test('debe tener la clase animate__fadeIn', () => {
    // Buscando por elemento html
    const div = wrapper.find('div')
    const className = div.prop('className')
    expect(className.includes('animate__fadeIn')).toBe(true)
    // Buscando por clase css
    const animated = wrapper.find('animate__fadeIn')
    expect(animated).not.toBeUndefined()
  })
})
