import React from 'react'
import BackgroundAnimation from './Background.animation'
import Carousel, { CarouselItem } from './Carousel.wrapper'
import City from '../City'

function Main(props) {

    const { weather, isLoading, cities, setSelectedCity } = props

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
                    />
                </CarouselItem>)
            )}
        </Carousel>

        {weather && <BackgroundAnimation graphic={weather.graphic} animate={isLoading} ></BackgroundAnimation>}


    </>)
}

export default Main