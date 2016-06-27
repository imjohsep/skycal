import React from 'react'

const Header = React.createClass({
    displayName: 'Header',

    render () {
        return React.createElement(
            'div',
            { className: 'r-row r-head' },
            React.createElement('div', { className: 'r-cell r-prev', onClick: this.props.onPrev.bind(null, this), role: 'button', tabIndex: '0' }),
            React.createElement(
                'div',
                { className: 'r-cell r-title' },
                this.props.monthNames[this.props.month],
                ' ',
                this.props.year
            ),
            React.createElement('div', { className: 'r-cell r-next', onClick: this.props.onNext.bind(null, this), role: 'button', tabIndex: '0' })
        )
    }
})

export default Header