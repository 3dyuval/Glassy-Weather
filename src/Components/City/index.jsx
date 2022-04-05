import React from "react"
import Stats from "./Stats.component"
import Hours from "./Hours.component"
import Days from "./Days.component"


function City({ weather, isLoading }) {

  return (
    <div className="city">
      <div className="left-view">
        <div className="title metadata">
          <h1>{weather?.metadata.name ?? 'Current City'}</h1>
          <h2>{weather?.metadata.localtime ?? 'Time in Current City'}</h2>
          <Hours animate={isLoading} hours={weather && weather.hours} />
        </div>
        {weather && <Stats
          stats={weather.stats}
          layoutName="main-stats"
        />}
      </div>
      {weather && <Days days={weather.days} />}
    </div >
  )
}
export default City