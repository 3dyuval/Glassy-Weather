import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from "./configReducer"
import * as defaultData from '../constants'


export const ConfigContext = createContext()
ConfigContext.displayName = "Stats filter configured by user"


export function ConfigProvider({ children }) {

    //reducer actions
    const [userConfig, dispatchUserConfig] = useReducer(reducer, [],
        () => {
            const storage = JSON.parse(localStorage.getItem("userConfig"))
            return storage || defaultData.DEFAULT_CONFIG
        }
    )

    //persist
    useEffect(() => {
        localStorage.setItem("userConfig", JSON.stringify(userConfig || defaultData.DEFAULT_CONFIG))
    }, [userConfig])

    const value = { userConfig, dispatchUserConfig }
    return (
        <ConfigContext.Provider value={value} >
            {children}
        </ConfigContext.Provider>
    )
}

