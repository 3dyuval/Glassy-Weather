import { useReducer, useLayoutEffect } from "react"
import { colors } from "../utils"

const reducer = (state, action) => {
    switch (action.type) {
        case "setColor": {
            return { ...state, color: { ...action.payload.color } }
        }
        case "setGraphic": {
            return { ...state, ...action.payload.graphic }
        }
        case "disable": {
            return { ...state, disabled: true }
        }
        case "darkMode": {
            return { ...state, darkMode: true }
        }
        default: {
            return state
        }
    }

}
useStyle.actionTypes = {
    SETCOLOR: "setColor",
    SETGRAPHIC: "setGraphic",
    DISABLE: "disable",
    DARKMODE: "darkMode"
}
function useStyle() {

    const [style, dispatch] = useReducer(reducer, { color: colors.colorTypes.light1 })

    //Update the style sheet and body class every state change
    useLayoutEffect(() => {
        document.body.className = style.color.name
        colors.setStyleSheet(style.color.url)
    }, [style])

    const setColor = (time) => {
        dispatch({
            type: useStyle.actionTypes.SETCOLOR,
            payload:
            {
                color: colors.byTime(time)
            }
        })
    }

    const setGraphic = (graphic) => {
        dispatch({
            type: useStyle.actionTypes.SETGRAPHIC,
            payload: {
                graphic: graphic
            }
        })
    }

    const disable = () => dispatch({ type: useStyle.actionTypes.DISABLE })
    const darkMode = () => dispatch({ type: useStyle.actionTypes.DARKMODE })

    return { style, setColor, disable, darkMode, setGraphic }
}


export { useStyle }  