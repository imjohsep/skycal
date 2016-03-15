import React, {PropTypes, Component} from 'react'

export default class Event extends Component {
  render() {
    return (
      <div className="event-node">
        {this.props.date} - {this.props.description}
      </div>
    );
  }
}