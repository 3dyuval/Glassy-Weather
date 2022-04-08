import format from "date-fns/format"
import * as Utils from "../Utils"

export function getDays(weather) {

    const formatDay = (date) => format(new Date(date), "EEEE")
    const formatDate = (date) => format(new Date(date), "dd/mm/yy")


    return weather.forecast.forecastday.map(itm => {
        return {
            stats: Utils.getStats(itm.day),
            date: formatDate(itm.date),
            name: formatDay(itm.date),
            temp: itm.day.avgtemp_c,
            condition: itm.day.condition.icon,
        }
    })
}
