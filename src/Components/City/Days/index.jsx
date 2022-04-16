import React, { useState } from 'react'
import Stats from '../Stats'
import { dummyDays } from '../../../utils'
import clsx from 'clsx'

function Days({ weather, isLoading }) {

    const [selectedDay, setSelectedDay] = useState('')

    const mapDays = (days) => {
        return days.map(day => <Day
            key={day.date}
            day={day}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
        />)
    }
    return (
        <div className="city-days">
            {mapDays(weather && weather.days || dummyDays)}
        </div>
    )

}

export default Days

function Day({ setSelectedDay, selectedDay, day }) {
    const { date, name, stats, temp, condition } = day;

    const classNames = clsx({
        day: true,
        selected: selectedDay === day
    })

    return (
        <div onClick={(previousDay) => setSelectedDay((selectedDay !== day) ? day : '')}
            className={classNames}>
            <div className="top">
                <div className="left">
                    <div>{name}</div>
                    <div>{date}</div>
                </div>
                <div className="right">
                    <div className="temp">{temp}</div>
                    <div>{condition && <img src={condition}></img>}</div>
                </div>
            </div>

            {stats && <div className="bottom">
                {/* <Stats stats={stats} /> */}
            </div>}
        </div>
    )
}