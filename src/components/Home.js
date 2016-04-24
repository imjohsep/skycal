import React, {Component} from 'react'
import Calendar from './Calendar'
import EventList from './EventList'

// Home page - displays upcoming events
export default class Home extends Component {
  render () {
    return (
      <div className="box-container">
        <div className="container-column">
          <div className="title">SkyCal</div>
          <hr />
          <EventList url='/api/events/upcoming'/>
        </div>
      </div>
    )
  }
}
