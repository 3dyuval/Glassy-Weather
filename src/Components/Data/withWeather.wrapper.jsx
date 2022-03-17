import React, { useState, useEffect } from "react"
import useWeather from "../../Hooks/useWeather"

//received a component and a city name

export default function Weather(WrappedComponent, name) {
  return props => {

    const { fakeAPI, getWeather } = useWeather()
    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(false)

    const useReal = true;

    function getData(cityName) {
      setLoading(true)
      try {
        getWeather(cityName)
          .then(data => {
            setWeather(() => data)
            setLoading(false)
          })
      } catch {
        err => console.log(err)
      }
    }

    function handleWeatherUpdate() {
      setLoading(true)
      if (!useReal) {
        fakeAPI(1000, name).then(data => {
          setWeather(data)
          setLoading(false)
        })
      } else {
        getData(name)
      }
    }


    useEffect(() => {
      handleWeatherUpdate()
    }, [])

    return (
      <WrappedComponent
        weather={weather}
        isLoading={isLoading}
        handleWeatherUpdate={handleWeatherUpdate}
        {...props}
      ></WrappedComponent>
    )
  }
}
