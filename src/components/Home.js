import React, {Component} from 'react'
import Calendar from './Calendar'
import EventList from './EventList'
import '../styles/home.sass'

// Home page - displays upcoming events
export default class Home extends Component {
  render () {
    return (
      <div className="main-view">
        <div className="eventList-shortView">
          <h1>Upcoming Events</h1>
          <EventList url='/api/events/upcoming'/>
        </div>
      </div>
    )
  }
}
