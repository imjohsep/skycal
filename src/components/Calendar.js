import React, {Component} from 'react'
import EventList from './EventList'

export default class Calendar extends Component {
  render () {
    return (
      <div>
        <div className="title">Sky Calendar</div>
        <EventList url="/api/events" />
      </div>
    )
  }
}