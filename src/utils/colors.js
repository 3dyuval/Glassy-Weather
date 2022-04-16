import { colors } from "../constants"
import { format } from "date-fns"

const byTime = (time) => {
    const hour = format(new Date(time), "HH")
    let color = colors.light1
    //dawn
    // 6, 7
    if (hour >= 6 && hour <= 7) {
        color = colors.light2
    }
    // day
    //  8 -  14
    else if (hour >= 8 && hour <= 14) {
        color = colors.light1
    }
    //afternoon
    //  15 -  18
    else if (hour >= 15 && hour <= 18) {
        color = colors.light2
    }
    //evening
    // 16 - 19,
    else if (hour >= 16 && hour <= 19) {
        color = colors.dark1
    }
    //night
    // 20 - 5, 
    else if (hour >= 20 && hour <= 24 || hour <= 5) {
        color = colors.dark2
    }
    return color
}



const setStyleSheet = (mode) => {
    const dark = '/src/assets/colors/dark.css'
    const light = '/src/assets/colors/light.css'

    const resolveStyle = (colorMode) => {
        if (colorMode.includes('dark')) {
            return dark
        } else {
            return light
        }
    }

    const cssNode = (mode) => {
        const cssURL = resolveStyle(mode)
        const domElement = document.createElement('link')
        domElement.setAttribute("rel", "stylesheet")
        domElement.setAttribute("type", "text/css")
        domElement.setAttribute('id', 'colorMode')
        domElement.setAttribute("href", cssURL)
        return domElement
    }


    const applyCSS = () => {
        //remove previous
        const prev = document.getElementById('colorMode')
        if (prev) {
            prev.remove()
        }
        //new stylesheet node
        const node = cssNode(mode)
        document.getElementsByTagName('head')[0].appendChild(node)
    }



    applyCSS()

}

export { byTime, setStyleSheet } 