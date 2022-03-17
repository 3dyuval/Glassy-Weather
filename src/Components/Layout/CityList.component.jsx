import React, { useState, useEffect } from "react"
import useStorage from "../../Hooks/useStorage"

//TODO, add stats
export default function CityList(props) {
  const { city, weather, setCityList, isLoading } = props
  const { deleteCity } = useStorage()

  return (
    <li className="city-item" key={city.id}>
      <span className="city-name">{city.name}</span>
      {isLoading && "loading..."}

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
}