import React from 'react'
import {Route} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Calendar from './components/Calendar'
import Day from './components/Day'
import NotFound from './components/NotFound'

const routes = (
  <Route component={App}>
  	// Home
    <Route path='/' component={Home} />
    
    // Other routes
    <Route path='calendar' component={Calendar} />
    <Route path='events/:dayId' component={Day} />

    // Not Found
    <Route path='/*' component={NotFound} />
  </Route>
)

export default routes
