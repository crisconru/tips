import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'

const CounterApp = ( { value = 10 } ) => {

    const [counter, setCounter] = useState(value)
    //console.log(counter, setCounter)

    const handleAdd = () => {
        //setCounter(counter + 1)
        setCounter( (c) => c + 1 )
    }

    const handleSubstract = () => {
        setCounter( (c) => c - 1)
    }

    const handleReset = () => {
        setCounter(value)
    }
    return (
        <Fragment>
            <h1>CounterApp</h1>
            <h2>{ counter }</h2>
            <button onClick={handleAdd} >+1</button>
            <button onClick={handleReset} >RESET</button>
            <button onClick={handleSubstract} >-1</button>
        </Fragment>
    )
}

CounterApp.propTypes = {
    value: PropTypes.number
}

export default CounterApp