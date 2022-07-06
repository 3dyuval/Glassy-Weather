import React, { useState } from "react"
import Days from "./Days/"
import Stats from "./Stats"
import Hours from "./Hours"


function City({ weather, selectedCity, isLoading, show }) {

  const [selectedDay, setSelectedDay] = useState(0)

  if (!show) return <></>
  return (
    <div className="city">
      <div className="city-header">
        <h1>{weather?.metadata?.name ?? selectedCity.name}</h1>
        <h2>{weather?.metadata?.localtime ?? `Time in ${selectedCity.name}`}</h2>
      </div>
      <div className="city-body">
        <Days
          weather={weather}
          isLoading={isLoading}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <div className="city-primary">
          <Hours
            animate={isLoading}
            hours={(selectedDay === 0) ? weather?.hours : weather?.days[selectedDay].hours ?? ''}
          />
          {weather && <Stats
            stats={weather.stats}
          />}
        </div>
      </div>
    </div>
  )
}
export default City