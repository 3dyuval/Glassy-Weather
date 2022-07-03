import codes from "./assets/weather-icons/"

const URL = {
    DEVELOPMENT: {
        LARGE: {
            DAY: '/src/assets/weather-icons/large/day/',
            NIGHT: '/src/assets/weather-icons/large/night/',
        },
        SMALL: {
            DAY: '/src/assets/weather-icons/small/day/',
            NIGHT: '/src/assets/weather-icons/small/night/',
        }
    },
    PRODUCTION: {
        LARGE: {
            DAY: './assets/weather-icons/large/day/',
            NIGHT: './assets/weather-icons/large/night/',
        },
        SMALL: {
            DAY: './assets/weather-icons/small/day/',
            NIGHT: './assets/weather-icons/small/night/',
        }
    }
}

/**
 * 
 * @param {Number} code The icon code 
 * @param {Bool} small The size of icon - small / large
 * @param {Bool} day If the time is between 6:00 to 18:00 get the day version
 * @returns {String} Url to relative path
 */
const getGraphic = (code, small = true, day = true) => {
    const entry = codes.find(itm => itm.code == code)

    if (!entry) {
        return ''
    }
    // development URL
    if (import.meta.env.MODE === 'development') {
        if (day === true) {
            if (small === true) {
                return `${URL.DEVELOPMENT.SMALL.DAY}${entry.icon}.svg`
            } else {
                return `${URL.DEVELOPMENT.LARGE.DAY}${entry.icon}.svg`
            }
        } else {
            if (small === true) {
                return `${URL.DEVELOPMENT.SMALL.NIGHT}${entry.icon}.svg`
            } else {
                return `${URL.DEVELOPMENT.LARGE.NIGHT}${entry.icon}.svg`
            }
        }
        //production URL
    } else {
        if (day === true) {
            if (small === true) {
                return `${URL.PRODUCTION.SMALL.DAY}${entry.icon}.svg`
            } else {
                return `${URL.PRODUCTION.LARGE.DAY}${entry.icon}.svg`
            }
        } else {
            if (small === true) {
                return `${URL.PRODUCTION.SMALL.NIGHT}${entry.icon}.svg`
            } else {
                return `${URL.PRODUCTION.LARGE.NIGHT}${entry.entry.icon}.svg`
            }
        }

    }


}

export { getGraphic }