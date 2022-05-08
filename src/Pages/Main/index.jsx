import React from 'react'
import BackgroundAnimation from './BackgroundAnimation'
import Carousel, { CarouselItem } from './CarouselWrapper'
import City from '../../Components/City'
import { CitiesContext } from '../../contextReducers'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useAddCity } from '../../Hooks'
import { useEffect } from 'react'

function Main(props) {

    const { weather, isLoading, cities, setSelectedCity, selectedCity } = useContext(CitiesContext)
    const param = useParams()

    const { addCity } = useAddCity()

    useEffect(() => {
        //get the city from url
        if (param.city) {
            //check if it already exists in the list
            if (cities.find(itm => itm.name.toLowerCase() === param.city.toLowerCase())) {
                setSelectedCity(param.city)
            }
            else {
                addCity(param.city)
            }
        }
    }, [])

    return (<>
        <Carousel
            cities={cities}
            setSelectedCity={setSelectedCity}
        >
            {cities.map(itm => (
                <CarouselItem key={itm.id}>
                    <City key={itm.id}
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