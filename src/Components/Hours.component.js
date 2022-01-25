import React, { useEffect, useState } from "react"
import { format, compareAsc } from "date-fns"

export default function Hours({ weather }) {
  const [temps, setTemps] = useState("")

  useEffect(() => {
    if (weather && weather.current !== undefined) {
      const currentHours = getEvenHoursStartingPresentMoment(
        weather.forecast.forecastday[0].hour
      )
      setTemps(mapHours())
    }
  }, [weather])

  const getEvenHoursStartingPresentMoment = hours => {
    const now = new Date()
    const filteredHours = []
    for (let i = 0; i < hours.length; i++) {
      if (compareAsc(new Date(hours[i].time), now) === 1) {
        filteredHours.push(hours[i].time)
      }
    }
    return filteredHours
  }

  const mapHours = () => {
    return weather.forecast.forecastday[0].hour.map((item, index) => {
      return (
        <div className="hour" key={`temp${index}`}>
          <div className="hour">{format(new Date(item.time), "HH:mm")}</div>
          <div className="single-temp">
            <img className="icon" src={item.condition.icon} />
            <div className="temp">{item.temp_c}</div>
          </div>
        </div>
      )
    })
  }

  if (!temps) return null

  return (
    <>
      <div className="chart-wrap">{temps && temps}</div>
    </>
  )
}
