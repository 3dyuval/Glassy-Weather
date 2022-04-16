import React, { useEffect, useLayoutEffect } from 'react'
import { useGetWeather, useColor } from "../../Hooks"
import { CITIES_EXAMPLES } from "../../constants";
import Main from '../Main';

function Homepage({ setSelectedCity, selectedCity }) {

  const { fetchWeather, weather } = useGetWeather(); // my custom hook 
  const { updateColor } = useColor()

  useEffect(() => {
    fetchWeather(selectedCity)
  }, [selectedCity])

  useEffect(() => {
    if (!weather) return
    updateColor(weather.color.name)
  }, [weather])


  useLayoutEffect(() => {
    document.title = `Weather in ${selectedCity}`
  }, [selectedCity])


  return (<>

    <div>
      <h1>Hello</h1>
    </div>
    <Main
      cities={CITIES_EXAMPLES}
      setSelectedCity={setSelectedCity}
      selectedCity={selectedCity}
      weather={weather}
    />
  </>)
}

export default Homepage