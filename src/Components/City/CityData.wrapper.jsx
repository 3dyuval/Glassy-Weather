import React, { useState, useEffect } from "react"
import useWeather from "../../Hooks/useWeather"

//received a component and a city name

export default function CityData(WrappedComponent, name) {
  return props => {

    const { fakeAPI, getWeather } = useWeather()

    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(false)

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
      fakeAPI(2500, name).then(data => {
        setWeather((weather) => data)
        setLoading(false)
      })
    }


    useEffect(() => {
      // let isMounted = true
      handleWeatherUpdate()
      // return () => { isMounted = false }
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
