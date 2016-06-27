import React from 'react'
const WeekDays = React.createClass({
    displayName: 'WeekDays',

    render () {
        var that = this,
            haystack = Array.apply(null, { length: 7 }).map(Number.call, Number)
        return React.createElement(
            'div',
            { className: 'r-row r-weekdays' },
            (() => {
                if (that.props.weekNumbers) {
                    return React.createElement(
                        'div',
                        { className: 'r-cell r-weeknum' },
                        'wn'
                    )
                }
            })(),
            haystack.map(function (item, i) {
                return React.createElement(
                    'div',
                    { className: 'r-cell',
                      key: item+i
                    },
                    that.props.dayNames[(that.props.startDay + i) % 7],
                )
            })
        )
    }
})

export default WeekDays