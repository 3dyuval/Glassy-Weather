import React, { useEffect, useState } from 'react'
import '../../SCSS/Days.scss'
import Conditions from './Conditions.component'


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

    const { date, name, stats } = day;

    function handleSelectDay() {
        setSelectedDay((selectedDay !== day) ? day : '')
    }

    return (
        <div onClick={handleSelectDay}
            className={selectedDay === day ? 'selectedDay day' : 'day'}>
            <div className="top">
                <div className="left">
                    <div>{name}</div>
                    <div>{date}</div>
                </div>
                <div className="right">
                    <div className="temp">{stats.temp}</div>
                    <div><img src={stats.condition}></img></div>
                </div>
            </div>

            <div className="stats-modal">
                <Conditions layoutName="daily-stats" conditions={stats.stats} />
            </div>
        </div>
    )
}