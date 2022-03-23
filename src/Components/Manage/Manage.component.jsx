import React from "react"
import AddCityInput from "../AddCity/AddCityInput.component"
import { Outlet } from "react-router-dom";

export default function Manage(props) {
  const { cities, setCities } = props

  if (cities === undefined || !cities.length) return null
  return (
    <div className="manage">
      <Outlet />
      <h1>Manage Cities</h1>
      <AddCityInput setCities={setCities} cities={cities} />
      <div className="manage-bg"></div>
      <ul className="manage-cities">
        {cities.map(itm => <CityListItem key={itm.id} name={itm.name} />)}
      </ul>
    </div>
  )
}


function CityListItem(props) {
  const { name } = props

  return (
    <li className="city-item" >
      <span className="city-name">{name}</span>
      <input
        type="button"
        value="X"
        className="delete-city"
      ></input>
    </li>

  )
}