import React, { useState, useEffect } from "react"
import Stats from "../Stats/Stats.component"
import Hours from "../Stats/Hours.component"
import useWeather from "../../Hooks/useWeather"
import Days from "../Stats/Days.component"
import "../../SCSS/City.scss"
import CurrentWeatherCondition from "../Layout/CurrentConditionGraphic"


export default function City(props) {
  const { cityName, weather, handleWeatherUpdate, isLoading } = props
  const { getStatsValues } = useWeather();
  const [weatherStats, setWeatherStats] = useState([])
  const { useHours, useMockHours } = useWeather()
  const [hours, setHours] = useState(useMockHours())


  useEffect(() => {
    if (!weather || weather.length == 0) return
    setWeatherStats(weatherStats => getStatsValues(weather.current))
    setHours((hours) => useHours(weather))

  }, [weather])

  return (<>
    <div className="city">
      <div style={{ margin: '2em' }} >
        {/* <input
          type="button"
          value={isLoading ? "loading..." : `Get Weather in ${cityName}`}
          disabled={isLoading}
          onClick={handleWeatherUpdate}
        /> */}
        <div className="title">
          <h1>{cityName}</h1>
          <h2>{weather.length ? weather.location.localtime : ''}</h2>
          <Hours hours={hours} isLoading={isLoading} />
        </div>
        <Stats
          weatherStats={weatherStats}
          isLoading={isLoading}
          layoutName="main-stats"
        />
      </div>
      <Days weather={weather} weatherStats={weatherStats} />
    </div >
    <CurrentWeatherCondition></CurrentWeatherCondition>
  </>
  )
}
