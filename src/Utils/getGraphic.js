import codes from "/src/Assets/WeatherConditions"

export function getGraphic(code) {
    const svg = codes.find(itm => itm.code == code)
    if (!svg) return ''
    if (import.meta.env.MODE === 'development') {
        return `/src/assets/WeatherConditions/${svg.icon}.svg`
    } else {
        return `./assets/WeatherConditions/${svg.icon}.svg`
    }

}