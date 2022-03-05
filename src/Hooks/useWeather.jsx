import { compareAsc } from "date-fns"
import citiesData from "./fakeData"

export default function useWeather() {

    function getWeather(accessPoint, options) {
        const baseURL = "http://api.weatherapi.com/v1"
        const apiKey = "?key=f2227dce13864693a89165508211212"
        return fetch(baseURL + accessPoint + apiKey + options).then(response =>
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

    function allHoursFromNow(hours) {
        const fromCurrent = []
        for (let i = 0; i < hours.length; i++) {
            if (compareAsc(new Date(hours[i].time).getHours(), new Date().getHours()) == 1) {
                fromCurrent.push(hours[i])
            }
        }
        return fromCurrent
    }

    function getStatsValues(weather) {

        const params = [{ name: "Temp", param: "temp_c" },
        { name: "Feels like", param: "feelslike_c" },
        { name: "Precipitation", param: "precip_mm" },
        { name: "Humidity", param: "humidity" },
        { name: "Windspeed", param: "wind_kph" }]

        let list = []
        params.forEach(item => {
            const statValue = weather.current[item.param]
            list.push({
                statName: item.name,
                statValue: !statValue ? '--' : statValue,
            })
        })
        return list
    }

    function mockHours() {
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
    return { getWeather, fakeAPI, allHoursFromNow, getStatsValues, mockHours }
}


