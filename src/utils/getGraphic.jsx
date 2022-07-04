import { codes } from "../assets/weather-icons"

const FOLDER = {
    LARGE: {
        DAY: 'large/day/',
        NIGHT: 'large/night/',
    },
    SMALL: {
        DAY: 'small/day/',
        NIGHT: 'small/night/',
    }
}


const getGraphic = (code, small = true, day = true) => {
    const entry = codes.find(itm => itm.code === code)
    if (entry?.icon == undefined) {
        return ''
    } else {
        return `assets/weather-icons/${small ? day ? FOLDER.SMALL.DAY : FOLDER.SMALL.NIGHT : day ? FOLDER.LARGE.DAY : FOLDER.LARGE.NIGHT}${entry.icon.toString()}.svg`
    }


}

export { getGraphic }