import format from "date-fns/format"
import * as Utils from "../utils"
import { getGraphic } from "./getGraphic"

export function getDays(weather) {

    const formatDay = (date) => format(new Date(date), "EEEE")
    const formatDate = (date) => format(new Date(date), "dd/mm/yy")


    return weather.forecast.forecastday.map(itm => {
        return {
            hours: Utils.getHours(itm.hour),
            stats: Utils.getStats(itm.day),
            date: formatDate(itm.date),
            name: formatDay(itm.date),
            temp: itm.day.avgtemp_c,
            graphic: getGraphic(itm.day.condition.code),
        }
    })
}
