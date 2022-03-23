import axios from "axios";
import { useState, useEffect } from "react";
import * as Utils from "../Utils"
import { toast } from "react-tiny-toast";

const LOCAL_SERVER = 'http://localhost:8000/'

export function useGetWeather(city = null) {

    const [weather, setWeather] = useState(null)
    const [isLoading, setLoading] = useState(false)

    function getWeather(city) {
        setLoading(true)
        try {
            axios.get(LOCAL_SERVER + city)
                .then(response => {
                    toast.show(`${response.data.location.name} weather fetched`, { timeout: 3000 })
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
