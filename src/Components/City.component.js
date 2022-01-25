import React from "react"
import Stats from "./Stats.component"
import Hours from "./Hours.component"

export default function CityItem(props) {
  const { cityName, weather, handleWeatherUpdate, isLoading } = props

  return (
    <div className="city comp1">
      <input
        type="button"
        value={isLoading ? "loading..." : `Get Weather in ${cityName}`}
        disabled={isLoading}
        onClick={handleWeatherUpdate}
      ></input>
      <div className="title">
        <span>
          <h1>{cityName}</h1>
        </span>
        <Hours weather={weather} />
      </div>
      <Stats weather={weather}></Stats>
      {isLoading && "loading..."}
    </div>
  )
}
