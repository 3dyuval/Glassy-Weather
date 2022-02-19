import React, { useState, useEffect } from "react"
import { useSpring, animated as a } from "react-spring"
import useWeather from "../Helpers/useWeather"

export default function Stats({ weatherStats, isLoading }) {

  if (isLoading) return null
  return <div className="stats comp3">
    {weatherStats.map(({ statName, statValue }) =>
      <Stat
        statName={statName}
        statValue={statValue}
        key={`stat-${statName}`}
      />
    )}
  </div>
}

function Stat({ statName, statValue, unit, isLoading }) {

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
        <span className="value">{statValue}</span>
        <span className="unit">{unit}</span>
      </div>
    </a.div>
  )
}
