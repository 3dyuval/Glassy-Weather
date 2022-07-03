import { useState } from 'react'
import { notifyUser } from "../utils"
import { useGetWeather } from './useGetWeather'
import { useContext } from 'react';
import { CitiesContext } from '../contextReducers';
import { useNavigate } from 'react-router-dom';

export function useAddCity() {
    const [isLoading, setIsLoading] = useState(false)
    const { fetchUrl } = useGetWeather()
    const { dispatchCities, actionTypes } = useContext(CitiesContext);
    const navigate = useNavigate()

    function addCity(city) {
        setIsLoading(true)
        try {
            const url = fetchUrl(city)
            fetch(url)
                .then(response => response.json())
                .then(parsed => {
                    dispatchCities({ type: actionTypes.ADD_CITY, payload: parsed.location.name, })
                    notifyUser(`${parsed.location.name} added`)
                    navigate(`/weather/${parsed.location.name}`)
                })
        }
        catch (err) {
            notifyUser(`${err}`)
            navigate('/')
        }
        finally {
            setIsLoading(false)
        }

    }

    return { addCity, isLoading }
}