import React from 'react'
import ReactDOM from 'react-dom'
import CounterApp from './CounterApp'
//import FirstApp from './FirstApp'

import './index.css'

const rootDiv = document.querySelector('#root')

ReactDOM.render(<CounterApp value={3}/>, rootDiv)
//ReactDOM.render(<FirstApp coletilla='zanguango'/>, rootDiv)
