import codes from "/src/Assets/WeatherConditions"

export function getGraphic(code) {
    const svg = codes.find(itm => itm.code == code)
    if (!svg) return ''
    return `/src/Assets/WeatherConditions/${svg.icon}.svg`
}