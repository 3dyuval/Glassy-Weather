import { useState } from "react";
import * as Utils from "../utils"

export function useGetWeather() {

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [weather, setWeather] = useState(null)

    const fetchUrl = (cityName) => {
        if (import.meta.env.MODE === 'development') {
            return import.meta.env.VITE_WEATHER_URL + cityName
        }
        return `/city/${cityName}`
    }


    function fetchWeather(cityName) {
        setLoading(true)

        const url = fetchUrl(cityName)

        try {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const sortedWeatherData = getWeatherData(data)
                    setWeather(sortedWeatherData)
                })
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }


    function getWeatherData(data) {
        return ({
            metadata: data.location,
            hours: Utils.getHours([...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]),
            days: Utils.getDays(data),
            stats: Utils.getStats(data.current),
            graphic: Utils.getGraphic(data.current.condition.code, false, Utils.dayOrNight(data.location.localtime)),
            color: Utils.colors.byTime(data.location.localtime)
        })
    }

    return { weather, fetchWeather, getWeatherData, isLoading, error, fetchUrl }
}
