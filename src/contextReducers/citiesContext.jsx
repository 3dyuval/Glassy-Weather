import React, { useState, createContext, useEffect, useReducer, useLayoutEffect } from 'react'
import { citiesReducer } from './citiesReducer'
import * as defaultData from '../constants'
import { useGetWeather, useColor } from "../Hooks/"


export const CitiesContext = createContext()
CitiesContext.displayName = "Cities to display"

export function CitiesProvider({ children }) {

    //reducer actions
    const [cities, dispatchCities] = useReducer(citiesReducer, [],
        () => {
            const storage = JSON.parse(localStorage.getItem("cities"))
            return storage || defaultData.DEFAULT_CITIES
        }
    )

    //initalize selected city by name
    const [selectedCity, setSelectedCity] = useState(() => cities[0].name || defaultData.DEFAULT_CITIES[0])
    const { fetchWeather, weather } = useGetWeather()
    const { updateColor } = useColor()
    //persist
    useEffect(() => {
        localStorage.setItem("cities", JSON.stringify(cities || defaultData.DEFAULT_CITIES))
    }, [cities])

    useEffect(() => {
        if (!weather) return
        updateColor(weather.color.name)
    }, [weather])

    useLayoutEffect(() => {
        fetchWeather(selectedCity)
        document.title = `Weather in ${selectedCity}`
    }, [selectedCity])

    //pass context to children
    const value = { cities, weather, selectedCity, setSelectedCity, dispatchCities }
    return (
        <CitiesContext.Provider value={value} >
            {children}
        </CitiesContext.Provider>
    )
}

