import React, {Component} from 'react'
import Calendar from './Calendar'
import EventList from './EventList'
// import style from '../styles/Home.css'

export default class Home extends Component {
  render () {
    return (
      <div>
        <Calendar/>
        <EventList url='/api/events/upcoming'/>
      </div>
    )
  }
}
