import React, { useEffect, useContext } from 'react'
import BackgroundAnimation from './BackgroundAnimation'
import Carousel, { CarouselItem } from './CarouselWrapper'
import City from '../../Components/City'
import { CitiesContext } from '../../contextReducers'
import { useParams } from 'react-router-dom'
import { useAddCity } from '../../Hooks'

function Main() {

    const { weather, cities, isLoading, selectedCity } = useContext(CitiesContext)
    const { city } = useParams()
    const { addCity } = useAddCity()

    useEffect(() => {
        //get the city name from url
        if (typeof city !== "string") return
        if (cities && !cities.find(itm => itm.name.toLowerCase() === city.toLowerCase())) {
            addCity(city)
        }
    }, [])

    return (<>
        <Carousel>
            {cities.map(city => {
                return <CarouselItem key={city.id}>
                    <City show={city.name === selectedCity.name} key={city.id} selectedCity={selectedCity} isLoading={isLoading} weather={weather} />
                </CarouselItem>
            }
            )
            }
        </Carousel>
        {weather && <BackgroundAnimation graphic={weather.graphic} ></BackgroundAnimation>}

    </>)
}

export default Main