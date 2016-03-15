import React, {PropTypes, Component} from 'react'
import style from '../styles/EventList.css'
import Event from './Event.js'
import $ from 'jquery'

export default class EventList extends Component {
  constructor() {
    super()
    this.state = {events: []}
  }

  componentDidMount() {
    this.loadUpcomingEvents()
  }

  loadUpcomingEvents() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({events: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    });
  }

  render() {
    var eventNodes = this.state.events.map(function(event) {
      return (
        <Event key={event.id} date={event.date} description={event.description}>
          {event.date} {event.description}
        </Event>
      )
    })

    return (
      <div className="event-node">
        {eventNodes}
      </div>
    );
  }
}