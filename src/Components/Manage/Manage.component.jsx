import React from "react"
import AddCityInput from "../AddCity/AddCityInput.component"
import { Outlet } from "react-router-dom";

export default function Manage(props) {
  const { cities, dispatch, citiesActions } = props


  if (cities === undefined || !cities.length) return null
  return (<>
    <div className="flex flex-col justify-center backdrop-blur p-6 ">
      <Outlet />
      <h1 className="text-xl">Manage Cities</h1>
      <AddCityInput dispatch={dispatch} cities={cities} citiesActions={citiesActions} />
      <ul className="manage-cities">
        {cities.map(itm => <CityListItem key={itm.id} id={itm.id} name={itm.name} dispatch={dispatch} citiesActions={citiesActions} />)}
      </ul>
    </div>
    <div className="manage-bg"></div>
  </>
  )
}


function CityListItem(props) {
  const { name, id, dispatch, citiesActions } = props

  return (
    <li className="my-4 flex justify-between">
      <span className="city-name">{name}</span>
      <input
        type="button"
        value="DELETE"
        className="delete-city"
        onClick={() => dispatch({ type: citiesActions.DELETE_CITY, payload: id })}
      ></input>
    </li>

  )
}