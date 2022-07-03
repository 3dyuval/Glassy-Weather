import React, { useEffect, useContext } from 'react'
import BackgroundAnimation from './BackgroundAnimation'
import Carousel, { CarouselItem } from './CarouselWrapper'
import City from '../../Components/City'
import { CitiesContext } from '../../contextReducers'
import { useParams } from 'react-router-dom'
import { useAddCity } from '../../Hooks'

function Main() {

    const { weather, isLoading, cities, setSelectedCity, selectedCity } = useContext(CitiesContext)
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
            {cities.map(city => (
                <CarouselItem key={city.id}>
                    <City
                        key={city.id}
                        isLoading={isLoading}
                        weather={weather}
                        selectedCity={selectedCity}
                    />
                </CarouselItem>)
            )}
        </Carousel>

        {weather && <BackgroundAnimation graphic={weather.graphic} ></BackgroundAnimation>}


    </>)
}

export default Main