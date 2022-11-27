import React, {useState, useMemo} from 'react'
import useCounter from '../../hooks/useCounter'
import { heavyProcess } from '../../helpers/heavyprocess'

import '../02-useEffect/effects.css'

export const MemoHook = () => {

    const { counter, increment } = useCounter(500)
    const [show, setShow] = useState(true)

    const memoHeavyProcess = useMemo(() => heavyProcess(counter), [counter])

    return (
        <>
            <h1>MemoHook</h1>
            <h3>Counter: <small>{counter}</small></h3>
            <hr />

            <p>{memoHeavyProcess}</p>

            <button className='btn btn-primary' onClick={() => increment()}>+1</button>
            <button className='btn btn-outline-primary ml-4' onClick={() => setShow(!show)}>
                Show / Hide -> { JSON.stringify(show) }
            </button>
        </>
    )
}
