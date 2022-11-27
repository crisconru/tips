import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const FirstApp = ( { coletilla, subtitulo } ) => {
    const saludo = 'Hola mundo'
    return (
        <Fragment>
            <h1>{ `${saludo} ${coletilla}` }</h1>
            <p>{ subtitulo }</p>
        </Fragment>
    )
}

FirstApp.propTypes = {
    coletilla: PropTypes.string.isRequired
}

FirstApp.defaultProps = {
    subtitulo: 'Soy un subtitulo'
}

export default FirstApp 