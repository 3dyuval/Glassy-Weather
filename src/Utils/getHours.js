import { compareAsc } from "date-fns/esm"

const NOW_INDEX = 0;
const NEXT_12_HOURS = 13;

export function getHours(weather) {

    const hours = [...weather.forecast.forecastday[0].hour, ...weather.forecast.forecastday[1].hour]
    const fromCurrent = []
    for (let i = 0; i < hours.length; i++) {
        //Do not enter hours before now
        if (compareAsc(new Date(hours[i].time), new Date()) == 1) {
            fromCurrent.push(hours[i])
        }
    }
    return fromCurrent.slice(NOW_INDEX, NEXT_12_HOURS)
}
