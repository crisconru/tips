import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'

import { GifExpertApp } from '../GifExpertApp'

describe('Pruebas en <GifExpertApp />', () => {
  let wrapper

  test('Debe mostrar el componente correctamente', () => {
    wrapper = shallow(<GifExpertApp />)
    expect(wrapper).toMatchSnapshot()
  })

  test('Debe de mostrar una lista de categorias', () => {
    const categories = ['One Punch', 'Dragon Ball']
    wrapper = shallow(<GifExpertApp defaultCategories={categories} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('GifGrid').length).toBe(categories.length)
  })
})
