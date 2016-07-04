import $ from 'jquery'
import React, {PropTypes, Component} from 'react'
import Header from './Header'
import WeekDays from './WeekDays'
import MonthDates from './MonthDates'

const Calendar = React.createClass({
    displayName: 'Calendar',
    getInitialState () {
        var date = new Date()
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            selectedYear: date.getFullYear(),
            selectedMonth: date.getMonth(),
            selectedDate: date.getDate(),
            selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            startDay: 1,
            weekNumbers: false,
            minDate: this.props.minDate ? this.props.minDate : null,
            disablePast: this.props.disablePast ? this.props.disablePast : false,
            dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            firstOfMonth: null,
            daysInMonth: null,
            events: null
        }
    },
    loadGroupedEvents () {
        $.ajax({
            url: '/api/events/grouped',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({events: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },
    calc (year, month) {
        if (this.state.selectedElement) {
            if (this.state.selectedMonth != month || this.state.selectedYear != year) {
                this.state.selectedElement.classList.remove('calendarComponent-selected')
            } else {
                this.state.selectedElement.classList.add('calendarComponent-selected')
            }
        }
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month + 1, 0).getDate()
        }
    },
    componentWillMount () {
        this.setState(this.calc.call(null, this.state.year, this.state.month))
    },
    componentDidMount () {
        this.loadGroupedEvents()
    },
    componentDidUpdate (prevProps, prevState) {
        if (this.props.onSelect && prevState.selectedDt != this.state.selectedDt) {
            this.props.onSelect.call(this.getDOMNode(), this.state)
        }
    },
    getPrev () {
        var state = {}
        if (this.state.month > 0) {
            state.month = this.state.month - 1
            state.year = this.state.year
        } else {
            state.month = 11
            state.year = this.state.year - 1
        }
        Object.assign(state, this.calc.call(null, state.year, state.month))
        this.setState(state)
    },
    getNext () {
        var state = {}
        if (this.state.month < 11) {
            state.month = this.state.month + 1
            state.year = this.state.year
        } else {
            state.month = 0
            state.year = this.state.year + 1
        }
        Object.assign(state, this.calc.call(null, state.year, state.month))
        this.setState(state)
    },
    selectDate (year, month, date, element) {
        if (this.state.selectedElement) {
            this.state.selectedElement.classList.remove('calendarComponent-selected')
        }
        element.target.classList.add('calendarComponent-selected')
        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDate: date,
            selectedDt: new Date(year, month, date),
            selectedElement: element.target
        })
    },
    render () {
        return React.createElement(
            'div',
            { className: 'calendarComponent' },
            React.createElement(
                'div',
                { className: 'calendarComponent-inner' },
                React.createElement(Header, { monthNames: this.state.monthNamesFull, month: this.state.month, year: this.state.year, onPrev: this.getPrev, onNext: this.getNext }),
                React.createElement(WeekDays, { dayNames: this.state.dayNames, startDay: this.state.startDay, weekNumbers: this.state.weekNumbers }),
                React.createElement(MonthDates, { month: this.state.month, year: this.state.year, daysInMonth: this.state.daysInMonth, firstOfMonth: this.state.firstOfMonth, startDay: this.state.startDay, onSelect: this.selectDate, weekNumbers: this.state.weekNumbers, disablePast: this.state.disablePast, minDate: this.state.minDate, events: this.state.events})
            )
        )
    }
})

export default Calendar