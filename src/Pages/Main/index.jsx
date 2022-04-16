import React from 'react'
import BackgroundAnimation from './BackgroundAnimation'
import Carousel, { CarouselItem } from './CarouselWrapper'
import City from '../../Components/City'

function Main(props) {

    const { weather, isLoading, cities, setSelectedCity, selectedCity } = props

    if (!cities) return null
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