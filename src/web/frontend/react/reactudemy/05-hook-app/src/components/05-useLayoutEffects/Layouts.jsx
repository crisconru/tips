import React, {useRef, useLayoutEffect, useState} from 'react'
import useCounter from '../../hooks/useCounter'
import { useFetch } from '../../hooks/useFetch'
import './layout.css'

export const Layouts = () => {

    const { counter, increment } = useCounter(1)

    const { data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`)
    const { quote } = !!data && data[0]


    const pQuote = useRef()
    const [boxSize, setBoxSize] = useState({})

    useLayoutEffect(() => {
        setBoxSize(pQuote.current.getBoundingClientRect())
    }, [quote])

    return (
        <div>
            <h1>Layout Effect</h1>
            <hr />

            <blockquote className="blockquote text-right">
                <p className="mb-0" ref={pQuote}>{quote}</p>
            </blockquote>

            <pre>{JSON.stringify( boxSize, null, 3)}</pre>

            <button className="btn btn-primary" onClick={() => increment(1)}>Next quote</button>

        </div>
    )
}
