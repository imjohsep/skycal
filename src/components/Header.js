import React from 'react'

const Header = React.createClass({
    displayName: 'Header',

    render () {
        return React.createElement(
            'div',
            { className: 'calendarComponent-row calendarComponent-head' },
            React.createElement('div', { className: 'calendarComponent-cell calendarComponent-prev', onClick: this.props.onPrev.bind(null, this), role: 'button', tabIndex: '0' }),
            React.createElement(
                'div',
                { className: 'calendarComponent-cell calendarComponent-title' },
                this.props.monthNames[this.props.month],
                ' ',
                this.props.year
            ),
            React.createElement('div', { className: 'calendarComponent-cell calendarComponent-next', onClick: this.props.onNext.bind(null, this), role: 'button', tabIndex: '0' })
        )
    }
})

export default Header