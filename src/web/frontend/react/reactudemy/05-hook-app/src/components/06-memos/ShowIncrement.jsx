import React from 'react'

export const ShowIncrement = React.memo(({callback}) => {
    console.log('ShowIncrement');
    return (
        <button className='btn btn-primary' onClick={() => callback(5)}>
            +1
        </button>
    )
})
