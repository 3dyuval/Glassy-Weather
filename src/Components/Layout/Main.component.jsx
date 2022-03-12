import React from "react"
import Carousel, { CarouselItem } from "./Carousel.wrapper"
import City from "../City/CityMain.component"
import CityData from "../City/CityData.wrapper"
import Welcome from "./Welcome.component"

export default function Main(props) {
  const { cityList, setCurrentCity } = props


  if (!cityList || cityList.length === 0) {
    return <Welcome />
  }

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
