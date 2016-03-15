import 'babel-polyfill'
import 'normalize.css'
import './styles/globals.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory as history} from 'react-router'
import attachFastClick from 'fastclick'
import routes from './routes'

// Remove 300ms tap delay on mobile devices
attachFastClick.attach(document.body)

// Expose globally
window.React = React

ReactDOM.render(
  <Router
    children={routes}
    history={history}
  />,
  document.getElementById('root')
)
