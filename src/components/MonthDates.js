import React from 'react'
import NavLink from './NavLink'
import { Link } from 'react-router'

const MonthDates = React.createClass({
    displayName: 'MonthDates',
    statics: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    },
    render () {
        var haystack,
            day,
            d,
            current,
            onClick,
            isDate,
            className,
            weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
            that = this,
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            janOne = new Date(that.props.year, 0, 1),
            rows = 5

        if (startDay == 5 && this.props.daysInMonth == 31 || startDay == 6 && this.props.daysInMonth > 29) {
            rows = 6
        }

        className = rows === 6 ? 'calendarComponent-dates' : 'calendarComponent-dates calendarComponent-fix'
        haystack = Array.apply(null, { length: rows }).map(Number.call, Number)
        day = this.props.startDay + 1 - first

        while (day > 1) {
            day -= 7
        }

        day -= 1

        return React.createElement(
            'div',
            { className: className },
            haystack.map(function (item, i) {
                d = day + i * 7

                return React.createElement(
                    'div',
                    { className: 'calendarComponent-row',
                      key: item+i
                    },
                    (() => {
                        if (that.props.weekNumbers) {
                            var wn = Math.ceil(((new Date(that.props.year, that.props.month, d) - janOne) / 86400000 + janOne.getDay() + 1) / 7)
                            return React.createElement(
                                'div',
                                { className: 'calendarComponent-cell calendarComponent-weeknum' },
                                wn
                            )
                        }
                    })(),
                    weekStack.map(function (item, i) {
                        d += 1
                        isDate = d > 0 && d <= that.props.daysInMonth

                        if (isDate) {
                            var eventKey = that.props.year + '-' + that.props.month + '-' + d
                            var testEvent = ''
                            var dateEvents = []

                            // Doing a check for events under a given yyyy-mm-dd key
                            if (that.props.events && eventKey in that.props.events) {
                                // retrieve the events for the built eventKey
                                dateEvents = that.props.events[eventKey]
                            }

                            // Style today block
                            current = new Date(that.props.year, that.props.month, d)

                            className = current != that.constructor.today ? 'calendarComponent-cell calendarComponent-date' : 'calendarComponent-cell calendarComponent-date calendarComponent-today'

                            if (that.props.disablePast && current < that.constructor.today) {
                                className += ' calendarComponent-past'
                            } else if (that.props.minDate !== null && current < that.props.minDate) {
                                className += ' calendarComponent-past'
                            }

                            // Day in a month
                            return (
                                <NavLink className={className}
                                         key={item+i}
                                         to={{ pathname: 'events/'+eventKey }}>
                                         {d}
                                </NavLink>
                            )
                        }

                        return React.createElement('div', {
                            className: 'calendarComponent-cell',
                            key: item+i
                        })
                    })
                )
            })
        )
    }
})

export default MonthDates