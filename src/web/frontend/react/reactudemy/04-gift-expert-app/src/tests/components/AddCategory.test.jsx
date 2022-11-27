import React from 'react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'

import { AddCategory } from '../../components/AddCategory'

describe('Pruebas para <AddCategory />', () => {
  const setCategories = jest.fn()
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallow(<AddCategory setCategories={setCategories} />)
  })

  test('Debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })
  /** /
  test('debe de cambiar la caja de texto', () => {
    const input = wrapper.find('input')
    input.simulate('change', { target: { value: 'Test AddCategory' } })
  })
  /**/
  test('No debe de postear la informacion con submit', () => {
    const e = { preventDefault() {} }
    wrapper.find('form').simulate('submit', e)
    expect(setCategories).not.toHaveBeenCalled()
  })

  test('Debe de llamar al setCategories y limpiar la caja de texto', () => {
    // Input - onChange
    const input = wrapper.find('input')
    const dataInput = { target: { value: 'hola mundo' } }
    input.simulate('change', dataInput)
    // Form - onSubmit
    const e = { preventDefault() {} }
    wrapper.find('form').simulate('submit', e)
    // Called
    expect(setCategories).toHaveBeenCalled()
    expect(setCategories).toHaveBeenCalledTimes(1)
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function))
    // Result
    expect(input.prop('value')).toBe('')
  })
})
