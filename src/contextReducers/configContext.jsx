import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from "./configReducer"
import * as defaultData from '../constants'


export const ConfigContext = createContext()
ConfigContext.displayName = "Stats filter configured by user"


export function ConfigProvider({ children }) {

    const [userConfig, dispatchUserConfig] = useReducer(reducer, [],
        () => {
            const storage = JSON.parse(localStorage.getItem("iserConfig"))
            return storage || defaultData.DEFAULT_CONFIG
        }
    )

    //persist
    useEffect(() => {
        if (!userConfig) return
        localStorage.setItem("userConfig", JSON.stringify(userConfig))
    }, [userConfig])

    const value = { userConfig, dispatchUserConfig }
    return (
        <ConfigContext.Provider value={value} >
            {children}
        </ConfigContext.Provider>
    )
}

