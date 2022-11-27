import React from 'react';
//import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { shallow } from 'enzyme';

import FirstApp from '../FirstApp'


describe('Pruebas FirstApp', () => {
    /*
    test('FirstApp debe devolver "Hola mundo zanguango"', () => {
        const resultado = 'Hola mundo zanguango'
        const col = 'zanguango'
        const { getByText } = render( <FirstApp coletilla={col}/> )
        expect( getByText(resultado) ).toBeInTheDocument()
    })
    */
    test('Debe mostrar <FirstApp/> con coletilla', () => {
        const col = 'zanguango'
        const componente = shallow( <FirstApp coletilla={col}/> )
        expect(componente).toMatchSnapshot()
     })
     test('Debe mostrar <FirstApp/> con subtitulo', () => {
        const col = 'zanguango'
        const sub = 'mangango'
        const componente = shallow( <FirstApp coletilla={col} subtitulo={sub}/> )
        const parrafo = componente.find('p').text()
        //console.log(parrafo)
        expect(parrafo).toBe(sub)
     })
})