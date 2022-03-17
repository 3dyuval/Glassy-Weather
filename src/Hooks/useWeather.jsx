import { compareAsc, format } from "date-fns"
import citiesData from "./fakeData"
import useStorage from "./useStorage"


export default function useWeather() {

    function getWeather(input) {
        const baseURL = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}`
        const options = `&q=${input}&days=3&aqi=no&alerts=no`
        return fetch(baseURL + options)
            .then(response =>
                response.json()
            )
    }

    function fakeAPI(ms, cityName) {
        const { telAviv, budapest, rome } = citiesData()
        return new Promise(resolve => {
            setTimeout(() => {
                switch (cityName) {
                    case "Tel Aviv":
                        return resolve(telAviv)
                    case "Budapest":
                        return resolve(budapest)
                    case "Rome":
                        return resolve(rome)
                }
            }, ms)
        })
    }

    function useMockHours() {
        function roundMinutes(date) {
            date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
            date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
            return date;
        }

        const mock = [...Array(12)].map((item, index) => {   // empty [obj] for empty boxes
            const o = { time: new Date(), condition: { icon: null }, temp_c: 0 }
            o.time.setHours(o.time.getHours() + index)
            o.time = roundMinutes(o.time)
            return o
        })
        return mock

    }

    function useHours(data) {

        const hours = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
        const fromCurrent = []
        for (let i = 0; i < hours.length; i++) {
            if (compareAsc(new Date(hours[i].time), new Date()) == 1) {
                fromCurrent.push(hours[i])
            }
        }
        return fromCurrent.slice(0, 13)
    }

    const { getUserConfig } = useStorage();

    function getStatsValues(data) {

        const userConfig = getUserConfig()

        let list = []
        userConfig.stats.forEach(stat => {
            const statValue = data[stat.id]
            list.push({
                statName: stat.id,
                statValue: !statValue ? '--' : statValue,
            })
        })
        return list
    }


    function sortDays(data) {

        const formatDay = (date) => format(new Date(date), "EEEE")
        const formatDate = (date) => format(new Date(date), "dd/mm/yy")

        return data.forecast.forecastday.map(day => {
            return {
                date: formatDate(day.date),
                name: formatDay(day.date),
                stats: {
                    temp: day.day.avgtemp_c,
                    condition: day.day.condition.icon,
                }

            }
        })
    }

    return { getWeather, fakeAPI, useHours, getStatsValues, useMockHours, sortDays }
}


