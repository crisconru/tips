import React from 'react'

export const Small = React.memo(( {value} ) => {
    console.log('Small llamandose')
    return (
        <small>
            {value}
        </small>
    )
})
