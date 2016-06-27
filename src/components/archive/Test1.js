import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

const test = React.createClass({
  render() {
    return (
      <div className="main-view">
        <h1>Test 1</h1>
        <div>{this.props.params.derp}</div>
        <ul role="nav">
          <li><Link to="/test" activeStyle={{ color: 'red' }}>test</Link></li>
          <li><Link to="/test1" activeStyle={{ color: 'red' }}>test1</Link></li>
        </ul>
      </div>
    )
  }
})

export default test