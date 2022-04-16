import { useState, useLayoutEffect } from "react"
import { colors } from "../utils"

function useColor() {

    const [colorCode, setColorCode] = useState("light1")

    useLayoutEffect(() => {
        document.body.className = colorCode
        colors.setStyleSheet(colorCode)
    }, [colorCode])

    //get and set color mode
    const updateColor = (color) => {
        if (!color) setColorCode("light1")
        setColorCode(color)
    }


    return { updateColor }
}



export { useColor }