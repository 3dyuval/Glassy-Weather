import { useState, useLayoutEffect } from "react"
import { setStyleSheet } from "../utils/colors"

function useColor() {

    const [colorCode, setColorCode] = useState("light1")

    useLayoutEffect(() => {
        document.body.className = colorCode
        setStyleSheet(colorCode)
    }, [colorCode])

    //get and set color mode
    const updateColor = (color) => {
        if (!color) setColorCode("light1")
        setColorCode(color)
    }


    return { updateColor }
}



export { useColor }