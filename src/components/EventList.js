import React, {PropTypes, Component} from 'react'

import Event from './Event.js'
import $ from 'jquery'

export default class EventList extends Component {
  constructor () {
    super()
    this.state = {events: []}
  }

  componentDidMount () {
    this.loadUpcomingEvents()
  }

  loadUpcomingEvents () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({events: data})
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  }

  render () {
    var eventNodes = this.state.events.map(function (event) {
      return (
        <Event key={event._id} date={event.occurrence_at} description={event.description}>
          {event.occurrence_at} {event.description}
        </Event>
      )
    })

    return (
      <div className='event-node'>
        {eventNodes}
      </div>
    )
  }
}

EventList.propTypes = { url: PropTypes.string.isRequired }
