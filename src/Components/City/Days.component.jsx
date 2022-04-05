import React, { useState } from 'react'
import Stats from './Stats.component'


function Days({ days }) {

    const [selectedDay, setSelectedDay] = useState('')

    return (
        <div className="days">
            {days && days.map(day => <Day
                key={day.date}
                day={day}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />)}
        </div>
    )
}

export default Days

function Day({ setSelectedDay, selectedDay, day }) {

    const { date, name, stats, temp, condition } = day;

    return (
        <div onClick={(previousDay) => setSelectedDay((selectedDay !== day) ? day : '')}
            className={selectedDay === day ? 'selectedDay day' : 'day'}>
            <div className="top">
                <div className="left">
                    <div>{name}</div>
                    <div>{date}</div>
                </div>
                <div className="right">
                    <div className="temp">{temp}</div>
                    <div><img src={condition}></img></div>
                </div>
            </div>

            <div className="stats-modal">
                <Stats layoutName="daily-stats" stats={stats} />
            </div>
        </div>
    )
}