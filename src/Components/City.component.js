import React, { useState, useEffect } from "react"
import Stats from "./Stats.component"
import Hours from "./Hours.component"
import useWeather from "../Helpers/useWeather"

export default function CityItem(props) {
  const { cityName, weather, handleWeatherUpdate, isLoading } = props
  const [hours, setHours] = useState([])
  const { allHoursFromNow, getStatsValues } = useWeather();
  const [weatherStats, setWeatherStats] = useState([])


  useEffect(() => {
    if (weather.length == 0) return
    const fromNow = allHoursFromNow(weather.forecast.forecastday[0].hour)
    const next12hours = fromNow.slice(0, 11)
    setHours(next12hours)
    const stats = getStatsValues(weather)
    setWeatherStats(() => stats)

  }, [weather])

  return (
    <div className="city comp1">
      <input
        type="button"
        value={isLoading ? "loading..." : `Get Weather in ${cityName}`}
        disabled={isLoading}
        onClick={handleWeatherUpdate}
      />
      <div className="title">
        <h1>{cityName}</h1>
        <Hours hours={hours} isLoading={isLoading} />
      </div>
      <Stats
        weatherStats={weatherStats}
        isLoading={isLoading} />
    </div>
  )
}
