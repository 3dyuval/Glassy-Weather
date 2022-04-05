const DEFAULT_SETTINGS =

{
    darkMode: false
}


const DEFAULT_WEATHER_STATS =
    [
        {
            title: "Temp", statName: "temp_c"
        },
        {
            title: "Feels like", statName: "feelslike_c"
        },
        {
            title: "Precipitation", statName: "precip_mm"
        },
        {
            title: "Humidity", statName: "humidity"
        },
        {
            title: "Windspeed", statName: "wind_kph"
        }
    ]



export const DEFAULT_CONFIG = { settings: DEFAULT_SETTINGS, stats: DEFAULT_WEATHER_STATS }