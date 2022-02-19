import { compareAsc } from "date-fns"
import { cities } from "./fakeData"

export default function useWeather() {

    function getWeather(accessPoint, options) {
        const baseURL = "http://api.weatherapi.com/v1"
        const apiKey = "?key=f2227dce13864693a89165508211212"
        return fetch(baseURL + accessPoint + apiKey + options).then(response =>
            response.json()
        )
    }

    function fakeApi(ms, cityName) {
        const { telAviv, budapest, rome } = cities()
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


    function allHoursFromNow(hoursData) {
        const hoursFromNow = []
        for (let i = 0; i < hoursData.length; i++) {
            new Date(hoursData[i].time)
            if (compareAsc(new Date(hoursData[i].time).getHours(), new Date().getHours()) == 1) {
                hoursFromNow.push(hoursData[i])
            }
        }
        return hoursFromNow
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
            if (statValue !== undefined) {
                list.push({
                    statName: item.name,
                    statValue: statValue,
                })
            }
        })
        return list
    }

    return { getWeather, fakeApi, allHoursFromNow, getStatsValues }
}


