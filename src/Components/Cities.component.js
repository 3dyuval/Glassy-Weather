import React from "react"
import Carousel, { CarouselItem } from "./Carousel"
import CityItem from "./City.component"
import CityData from "./CityData.component"

export function Cities(props) {
  const { cityList, setCurrentCity } = props

  if (!cityList || cityList.length === 0) {
    return <CityItem cityName="No City Seleted"></CityItem>
  }

  return (
    <Carousel cityList={cityList} setCurrentCity={setCurrentCity}>
      {cityList.map(city => {
        const City = CityData(CityItem, city.name)
        return (
          <CarouselItem key={city.name}>
            <City key={city.name} cityName={city.name} />
          </CarouselItem>
        )
      })}
    </Carousel>
  )
}
