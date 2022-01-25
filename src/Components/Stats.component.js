import React, { useState, useEffect } from "react"
import { useSpring, animated as a } from "react-spring"

export default function Stats(props) {
  const { weather, isLoading } = props

  const [weatherStats, setWeatherStats] = useState([])
  const [statParams, setStatParams] = useState([
    { name: "Temp", param: "temp_c" },
    { name: "Feels like", param: "feelslike_c" },
    { name: "Precipitation", param: "precip_mm" },
    { name: "Humidity", param: "humidity" },
    { name: "Windspeed", param: "wind_kph" },
  ])

  useEffect(() => {
    if (weather && weather.current !== undefined) {
      setWeatherStats(getFilteredWeatherStatsFromParams(statParams))
    }
  }, [weather])

  function getFilteredWeatherStatsFromParams(params) {
    let list = []
    params.forEach(item => {
      const value = weather.current[item.param]
      if (value !== undefined) {
        list.push({
          statName: item.name,
          value: value,
        })
      }
    })
    return list
  }

  function mapStatsComponents(arr) {
    return arr.map(({ statName, value }, index) => (
      <Stat
        weather={weather}
        isLoading={isLoading}
        statName={statName}
        value={value}
        key={`stat${index}`}
      />
    ))
  }

  if (!weatherStats) return null
  return <div className="stats comp3">{mapStatsComponents(weatherStats)}</div>
}

function Stat(props) {
  const { statName, value, unit, isLoading } = props

  const { styles } = useSpring({ opacity: !isLoading ? 1 : 0 })

  return (
    <a.div
      className="stat"
      id={statName}
      alt={statName}
      title={statName}
      style={styles}
    >
      <div className="nameContainer">
        <span className="name">{statName ? statName : "stat"}</span>
      </div>
      <div className="valueContainer">
        <span className="value">{value}</span>
        <span className="unit">{unit}</span>
      </div>
    </a.div>
  )
}
