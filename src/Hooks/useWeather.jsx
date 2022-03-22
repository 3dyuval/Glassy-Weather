import axios from "axios";
import { compareAsc, format } from "date-fns"
import { useState, useEffect } from "react";
import { toast } from "react-tiny-toast";
import useStorage from "./useStorage"
import codes from "../Assets/WeatherConditions/"


function useWeather(city = null) {

    const { getStorageConfig } = useStorage();
    const [weather, setWeather] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [stats, setStats] = useState([])
    const [graphic, setGraphic] = useState(null)


    function fetchWeather(city) {
        setLoading(true)
        try {
            axios.get(`/${city}`)
                .then(response => {
                    toast.show(`${response.data.location.name} weather fetched`, { timeout: 3000 })
                    setWeather(response.data)
                    // console.log(response.data)
                    setStats(getStats(response.data))
                    const svg = codes.find(itm => itm.code == response.data.current.condition.code)
                    setGraphic((previous) => `/src/Assets/WeatherConditions/${svg.icon}.svg`)
                })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!city) return
        fetchWeather(city)
    }, [])


    function getStats(weather) {
        const stats = {
            hours: getHoursFromWeather(weather),
            conditions: userSettingsFilteredStats(weather),
            days: sortDays(weather),
        }
        return stats
    }

    function getHoursFromWeather(weather) {

        const hours = [...weather.forecast.forecastday[0].hour, ...weather.forecast.forecastday[1].hour]
        const fromCurrent = []
        for (let i = 0; i < hours.length; i++) {
            if (compareAsc(new Date(hours[i].time), new Date()) == 1) {
                fromCurrent.push(hours[i])
            }
        }
        return fromCurrent.slice(0, 13)
    }

    function userSettingsFilteredStats(weather) {

        const userConfig = getStorageConfig('stats')
        let list = []
        userConfig.forEach(stat => {
            const statValue = weather.current[stat.id]
            if (!statValue) return
            list.push({
                statName: stat.id,
                statValue: statValue ? statValue : '--'
            })
        })
        return list
    }

    function userSettingsFilteredDaysStats(stats) {

        let list = []
        for (const property in stats) {
            if (typeof stats[property] === 'number') {
                list.push({
                    statName: property,
                    statValue: stats[property]
                })
            }

        }
        return list
    }

    function sortDays(weather) {

        const formatDay = (date) => format(new Date(date), "EEEE")
        const formatDate = (date) => format(new Date(date), "dd/mm/yy")

        return weather.forecast.forecastday.map(day => {
            return {
                date: formatDate(day.date),
                name: formatDay(day.date),
                stats: {
                    temp: day.day.avgtemp_c,
                    condition: day.day.condition.icon,
                    stats: userSettingsFilteredDaysStats(day.day)
                }

            }
        })
    }



    return { weather, stats, isLoading, fetchWeather, graphic }
}


export default useWeather