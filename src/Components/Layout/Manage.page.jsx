import React, { useEffect } from "react"
import useStorage from "../../Hooks/useStorage"
import CityList from "./CityList.component"
import CityData from "../Data/withWeather.wrapper"
import Cities from "../Data/withCities.wrapper"
import AddCityInput from "./AddCityInput.component"
import '../../SCSS/ManageCities.scss'

export default function Manage(props) {
  const { cityList, setCityList } = props
  const { saveList } = useStorage()

  useEffect(() => {
    saveList(cityList)
  }, [cityList])

  if (cityList === undefined || !cityList.length) return null
  return (
    <div className="manage">
      <h1>Manage Cities</h1>
      <div className="manage-bg"></div>
      <div className="city-list">
        {cityList.map(city => {
          const CityItem = CityData(CityList, city.name)
          return <CityItem key={city.id} city={city} setCityList={setCityList} />
        })}
      </div>
      <Cities setCityList={setCityList} >
        <AddCityInput />
      </Cities>
    </div>
  )
}
