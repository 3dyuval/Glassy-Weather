import React, { useState } from 'react'
import '../../SCSS/Days.scss'

function Days() {

    const [selectedDay, useSelectedState] = useState('')

    return (
        <div className="days">
            <Day day="Today" selected={selectedDay} useSelectedState={useSelectedState} />
            <Day day="Monday" selected={selectedDay} useSelectedState={useSelectedState} />
            <Day day="Tuesday" selected={selectedDay} useSelectedState={useSelectedState} />
            <Day day="Wednesday" selected={selectedDay} useSelectedState={useSelectedState} />
            <Day day="Thursday" selected={selectedDay} useSelectedState={useSelectedState} />
            <Day day="Saturday" selected={selectedDay} useSelectedState={useSelectedState} />
            <Day day="Sunday" selected={selectedDay} useSelectedState={useSelectedState} />
        </div>
    )
}

export default Days

function Day(props) {

    function handleSelectDay() {
        props.useSelectedState(props.day)
    }

    return (
        <div onClick={handleSelectDay}
            className={props.day === props.selected ? 'selectedDay day' : 'day'}>
            <div>
                {props.day}
            </div>
        </div>
    )
}