import React from 'react'
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
                            current = new Date(that.props.year, that.props.month, d)
                            className = current != that.constructor.today ? 'calendarComponent-cell calendarComponent-date' : 'calendarComponent-cell calendarComponent-date calendarComponent-today'
                            if (that.props.disablePast && current < that.constructor.today) {
                                className += ' calendarComponent-past'
                            } else if (that.props.minDate !== null && current < that.props.minDate) {
                                className += ' calendarComponent-past'
                            }

                            if (/calendarComponent-past/.test(className)) {
                                return React.createElement(
                                    'div',
                                    { className: className,
                                      key: item+i,
                                      role: 'button',
                                      tabIndex: '0' },
                                    d
                                )
                            }

                            return React.createElement(
                                'div',
                                { className: className,
                                  key: item+i,
                                  role: 'button',
                                  tabIndex: '0',
                                  onClick: that.props.onSelect.bind(null, that.props.year, that.props.month, d)
                                },
                                d
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