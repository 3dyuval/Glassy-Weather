import React, { useState, useEffect } from "react"
import useFetch from "../Helpers/useFetch"

export default function CityData(WrappedComponent, name) {
  return props => {
    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(false)
    const { fakeApi } = useFetch()

    function getWeather() {
      setLoading(true)
      fakeApi(500, name).then(res => {
        setWeather(res || "no data")
        setLoading(false)
      })
    }

    useEffect(() => {
      getWeather()
    }, [])

    return (
      <WrappedComponent
        weather={weather}
        isLoading={isLoading}
        handleWeatherUpdate={getWeather}
        {...props}
      ></WrappedComponent>
    )
  }
}
