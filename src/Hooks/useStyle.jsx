import { useReducer, useLayoutEffect } from "react"
import { colors, getGraphic, dayOrNight } from "../utils"

const reducer = (state, action) => {
    switch (action.type) {
        case "setColor": {
            return { ...state, color: { ...action.payload.color } }
        }
        case "setGraphic": {
            return { ...state, ...action.payload.graphic }
        }
        case "disable": {
            return { disabled: true }
        }
        case "darkMode": {
            return { ...state, darkMode: true }
        }
        default: {
            throw Error(`Unhandled action type: ${action.type}`)
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
        //TODO: connect to dark mode, add a disable button
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

    //TODO expose this directly to <BackgroundAnimation />
    //And rerender this animation according to the day
    //useStyle => WeatherContext => <BackgroundAnimation />
    //useStyle => WeatherContext => <Day />
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