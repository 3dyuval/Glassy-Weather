import React from 'react'
import { dummyDays, getGraphic } from "../../../utils"

function Days({ weather, selectedDay, setSelectedDay }) {

    const mapDays = (days) => {
        return days.map((day, idx) => <Day
            className="day list-item"
            selected={idx === selectedDay}
            setSelectedDay={setSelectedDay}
            key={idx}
            day={day}
            index={idx}
        />)
    }
    return (
        <div className="city-days">
            {mapDays(weather && weather.days || dummyDays)}
        </div>
    )

}

export default Days

function Day({ day, index, selected, setSelectedDay }) {
    const { date, name, stats, temp, graphic } = day;

    return (
        <div className={`day list-item ${selected ? 'selected' : ''}`} onClick={(e) => { setSelectedDay(index) }}>
            <div className="top">
                <div className="left">
                    <div>{name}</div>
                    <div>{date}</div>
                </div>
                <div className="right">
                    <div className="temp">{temp}</div>
                    <div className="graphic-day">{graphic && <img src={getGraphic(graphic)}></img>}</div>
                </div>
            </div>

            {stats && <div className="bottom">
                {/* <Stats stats={stats} /> */}
            </div>}
        </div>
    )
}