import axios from "axios";
import { useState, useEffect } from "react";
import * as Utils from "../Utils"
import { notifyUser } from "../Utils";


const api = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.SERVER_URL
    }
    return process.env.LOCAL_SERVER_URL
}



export function useGetWeather(city = null) {

    const [weather, setWeather] = useState(null)
    const [isLoading, setLoading] = useState(false)

    function getWeather(city, notification = null) {
        setLoading(true)
        try {
            axios.get(api() + city)
                .then(response => {
                    notifyUser(notification ? notification : `${response.data.location.name} weather fetched`)
                    setWeather({
                        metadata: response.data.location,
                        hours: Utils.getHours(response.data),
                        days: Utils.getDays(response.data),
                        stats: Utils.getStats(response.data.current),
                        graphic: Utils.getGraphic(response.data.current.condition.code)
                    })

                })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!city) return
        getWeather(city)
    }, [])

    return { weather, getWeather, isLoading }
}
