import React from 'react'
import {Route} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Calendar from './components/Calendar'
import NotFound from './components/NotFound'

const routes = (
  <Route component={App}>
  	// Home
    <Route path='/' component={Home} />
    
    // Other routes
    <Route path='/calendar' component={Calendar} />

    // Not Found
    <Route path='/*' component={NotFound} />
  </Route>
)

export default routes
