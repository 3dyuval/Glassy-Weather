import { useState } from "react";
import * as Utils from "../utils"

const url = city => `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${city}&days=3&aqi=no&alerts=no`
export function useGetWeather() {

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [weather, setWeather] = useState(null)


    function fetchWeather(cityName) {
        setLoading(true)


        try {
            fetch(url(cityName))
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
        const { location, forecast, current } = data
        return ({
            metadata: data.location,
            hours: Utils.getHours([...forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]),
            days: Utils.getDays(data),
            stats: Utils.getStats(current),
            graphic: Utils.getGraphic(current.condition.code, false, Utils.dayOrNight(location.localtime)),
            color: Utils.colors.byTime(location.localtime)
        })
    }

    return { weather, fetchWeather, getWeatherData, isLoading, error }
}
