import React, { useEffect } from "react"
import useStorage from "../../Hooks/useStorage"
import CityList from "../City/CityList.component"
import CityData from "../City/CityData.wrapper"
import AddCity from "./AddCity.component"
import '../../SCSS/ManageCities.scss'

export default function ManageCities(props) {
  const { cityList, setCityList } = props
  const { saveList } = useStorage()

  useEffect(() => {
    saveList(cityList)
  }, [cityList])


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
      <AddCity setCityList={setCityList} />
    </div>
  )
}
