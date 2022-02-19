import React, { useState, useEffect } from "react"
import useWeather from "../Helpers/useWeather"

export default function CityData(WrappedComponent, name) {
  return props => {
    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { getWeather, fakeApi } = useWeather()

    function getData(cityName) {
      setLoading(true)
      try {
        const accessPoint = "/forecast.json"
        const options = "&q=" + cityName + "&days=1"
        getWeather(accessPoint, options).then(data => {
          setWeather(() => data)
          setLoading(false)
        })
      } catch {
        err => console.log(err)
      }
    }

    function handleWeatherUpdate() {
      setLoading(true)
      fakeApi(500, name).then(data => {
        setWeather(data)
        setLoading(false)
      })
    }


    useEffect(() => {
      let isMounted = true
      if (isMounted) handleWeatherUpdate()
      return () => { isMounted = false }
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
