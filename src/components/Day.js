import React, {PropTypes, Component} from 'react'

const Day = ({ params: {dayId} }) => {
    return (
        <div>
            <h1>Day id: {dayId}</h1>
        </div>
    )
}

export default Day