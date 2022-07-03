import { useState, createContext, useEffect, useReducer, useLayoutEffect, useMemo } from 'react'
import { citiesReducer, actionTypes } from './citiesReducer'
import * as defaultData from '../constants'
import { useGetWeather, useStyle } from "../Hooks/"

//TODO refactor this into WeatherContext
//It will be in charge of fetching Weather
// and changing the theme according the Weather
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


    //initalize selected city by object
    const [selectedCity, setSelectedCity] = useState(() => cities.find(itm => itm.selected) || defaultData.DEFAULT_CITIES[0])
    const { fetchWeather, weather, isLoading } = useGetWeather()
    const { setColor } = useStyle()


    //persist
    useEffect(() => {
        localStorage.setItem("cities", JSON.stringify(cities || defaultData.DEFAULT_CITIES))
        setSelectedCity(cities.find(itm => itm.selected))
    }, [cities])


    useLayoutEffect(() => {
        fetchWeather(selectedCity.name)
        document.title = `Weather in ${selectedCity.name}`
    }, [selectedCity])

    useEffect(() => {
        if (!weather) return
        setColor(weather.metadata.localtime)
    }, [weather])


    // when the selected day changes
    //pass context to children
    const value = { cities, weather, selectedCity, setSelectedCity, dispatchCities, actionTypes, isLoading }
    return (
        <CitiesContext.Provider value={value} >
            {children}
        </CitiesContext.Provider>
    )
}
