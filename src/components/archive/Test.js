import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'
import '../styles/event-list.sass'

const test = React.createClass({
  render() {
    return (
      <div className="main-view">
        <h1>Test</h1>
        <ul>
          <li><NavLink to="/test">test</NavLink></li>
          <li><NavLink to="/test1">test1</NavLink></li>
        </ul>
      </div>
    )
  }
})

export default test