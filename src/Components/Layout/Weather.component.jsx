import React from "react"
import Carousel, { CarouselItem } from "./Carousel.wrapper"
import City from "./CityMain.component"
import CityData from "../Data/withWeather.wrapper"
import Welcome from "./Welcome.component"


export default function Weather(props) {
  const { cityList, setCurrentCity, handleAddCity } = props

  // if (cityList === undefined || !cityList.length) return <Welcome cityList={cityList} handleAddCity={handleAddCity} />

  return (<>
    <Carousel cityList={cityList} setCurrentCity={setCurrentCity}>
      {cityList.map(city => {
        const CityItem = CityData(City, city.name)
        return (
          <CarouselItem key={city.name}>
            <CityItem key={city.name} cityName={city.name} />
          </CarouselItem>
        )
      })}
    </Carousel>

  </>
  )
}
