import React, { useEffect, useState } from 'react'
import useStorage from '../../Hooks/useStorage'
import useWeather from '../../Hooks/useWeather'
import '../../SCSS/Days.scss'
import Stats from './Stats.component'

function Days({ weather }) {

    const [selectedDay, useSelectedState] = useState('')
    const [days, setDays] = useState()

    const { sortDays, getStatsValues } = useWeather();


    useEffect(() => {
        if (weather.length === 0) return
        setDays(days => sortDays(weather))
    }, [weather])


    return (
        <div className="days">
            {days && days.map(day => <Day
                key={day.date}
                day={day}
                selected={selectedDay}
                useSelectedState={useSelectedState}
                weatherStats={getStatsValues(day)}
            />)}
        </div>
    )
}

export default Days

function Day(props) {
    const { date, name, stats } = props.day;
    const { weatherStats, useSelectedState } = props;

    function handleSelectDay() {
        useSelectedState(props.day)
    }

    return (
        <div onClick={handleSelectDay}
            className={props.day === props.selected ? 'selectedDay day' : 'day'}>
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
                <Stats weatherStats={weatherStats} layoutName="daily-stats" />
            </div>
        </div>
    )
}