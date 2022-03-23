import codes from "../Assets/WeatherConditions"

export function getGraphic(code) {
    const svg = codes.find(itm => itm.code == code)
    return `/src/Assets/WeatherConditions/${svg.icon}.svg`
}