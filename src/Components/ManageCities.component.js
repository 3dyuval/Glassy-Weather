import React, { useEffect } from "react"
import AddCity from "./AddCity.component"
import CityData from "./CityData.component"
import useStorage from "../Helpers/useStorage"
import Stats from "./Stats.component"

export default function ManageCities(props) {
  const { cityList, setCityList } = props
  const { deleteCity, saveList } = useStorage()

  useEffect(() => {
    saveList(cityList)
  }, [cityList])

  return (
    <div className="manage">
      <h1>Manage Cities</h1>
      <div className="manage-bg"></div>
      <div className="city-list">
        <AddCity setCityList={setCityList} />
        {cityList.map(city => {
          const City = CityData(CityListItem, city.name)
          return <City key={city.id} city={city} setCityList={setCityList} />
        })}
      </div>
    </div>
  )
}

function CityListItem(props) {
  const { city, weather, setCityList, isLoading } = props
  const { deleteCity } = useStorage()

  const listItem = (
    <li className="city-item" key={city.id}>
      <span className="city-name">{city.name}</span>
      {isLoading && "loading..."}
      <Stats weather={weather}></Stats>

      <input
        type="button"
        value="X"
        className="delete-city"
        onClick={() => {
          setCityList(deleteCity(city))
        }}
      ></input>
    </li>
  )

  return listItem
}
