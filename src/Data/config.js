const DEFAULT_SETTINGS =
    [
        {
            darkMode: false
        }
    ]

const DEFAULT_WEATHER_STATS =
    [
        {
            name: "Temp", id: "temp_c"
        },
        {
            name: "Feels like", id: "feelslike_c"
        },
        {
            name: "Precipitation", id: "precip_mm"
        },
        {
            name: "Humidity", id: "humidity"
        },
        {
            name: "Windspeed", id: "wind_kph"
        }
    ]


export const DEFAULT_CONFIG = { settings: DEFAULT_SETTINGS, stats: DEFAULT_WEATHER_STATS }