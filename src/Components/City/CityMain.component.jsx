import React, { useState, useEffect } from "react"
import Stats from "../Stats/Stats.component"
import Hours from "../Stats/Hours.component"
import useWeather from "../../Hooks/useWeather"
import Days from "./Days.component"
import "../../SCSS/City.scss"

// TODO CityItem responsibility is only to compose the display data
//TODO  STATS is only receiving  weather
//TODO hours is only receiving  weather
//TODO merge with CityData
//TODO add component for Days (forecast)

export default function City(props) {
  const { cityName, weather, handleWeatherUpdate, isLoading } = props
  const { allHoursFromNow, getStatsValues } = useWeather();
  const [hours, setHours] = useState([])
  const [weatherStats, setWeatherStats] = useState([])


  useEffect(() => {
    if (!weather || weather.length == 0) return
    const fromNow = allHoursFromNow(weather.forecast.forecastday[0].hour)
    const next12hours = fromNow.slice(0, 11)
    setHours(next12hours)
    setWeatherStats(weatherStats => getStatsValues(weather))

  }, [weather])

  return (
    <div className="city">
      <div style={{ margin: '2em' }} >
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
      <Days />
    </div >
  )
}
