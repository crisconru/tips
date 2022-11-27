import React from 'react';
//import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { shallow } from 'enzyme';

import CounterApp from '../CounterApp'


describe('Pruebas CounterApp', () => {
    /*
    test('FirstApp debe devolver "Hola mundo zanguango"', () => {
        const resultado = 'Hola mundo zanguango'
        const col = 'zanguango'
        const { getByText } = render( <FirstApp coletilla={col}/> )
        expect( getByText(resultado) ).toBeInTheDocument()
    })
    */

   let componente = shallow( <CounterApp /> )

    beforeEach(() => {
        componente = shallow( <CounterApp /> )
    })

    test('Debe mostrar <CounterApp/> con 10', () => {
        //const value = parseInt( componente.find('h2').text() )
        expect(componente).toMatchSnapshot()
        //expect(value).toBe(10)
    })
    test('Debe mostrar <CounterApp/> con 100', () => {
        const val = 100
        const componente = shallow( <CounterApp value={val}/> )
        const value = parseInt( componente.find('h2').text() )
        expect(componente).toMatchSnapshot()
        expect(value).toBe(val)
    })

    test('Boton incrementar en 1', () => {
        componente.find('button').at(0).simulate('click')
        const val = componente.find('h2').text().trim()
        expect(val).toBe('11')
    })

    test('Boton decrementar en 1', () => {
        componente.find('button').at(2).simulate('click')
        const val = componente.find('h2').text().trim()
        expect(val).toBe('9')
    })

    test('Boton resetear a 10', () => {
        const valor = 100
        const componente = shallow( <CounterApp value={valor}/> )
        componente.find('button').at(0).simulate('click')
        componente.find('button').at(1).simulate('click')
        const val = componente.find('h2').text().trim()
        expect(val).toBe(`${valor}`)
    })


})