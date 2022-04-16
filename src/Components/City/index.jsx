import React from "react"
import Days from "./Days/"
import Stats from "./Stats"
import Hours from "./Hours"


function City({ weather, isLoading, selectedCity }) {


  return (
    <div className="city">
      <div className="city-header">
        <h1>{weather?.metadata?.name ?? selectedCity}</h1>
        <h2>{weather?.metadata?.localtime ?? `Time in ${selectedCity}`}</h2>
      </div>
      <div className="city-body">
        <Days weather={weather} isLoading={isLoading} />
        <div className="city-primary">
          <Hours animate={isLoading} hours={weather && weather.hours} />
          {weather && <Stats stats={weather.stats} />}
        </div>
      </div>
    </div>
  )
}
export default City