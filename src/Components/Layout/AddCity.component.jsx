import React, { useState } from "react"
import useStorage from "../../Hooks/useStorage"

export default function AddCity(props) {
  const [cityInput, setCityInput] = useState("")
  const { setCityList, cityList } = props
  const { addCity, getStorage } = useStorage()

  function handleAddCity(event) {
    event.preventDefault()
    if (!cityInput) {
      return
    } else {
      const added = addCity(cityInput)
      setCityList(added)
    }
  }

  return (
    <>
      <div className="add-city">
        <form onSubmit={handleAddCity}>
          <label htmlFor="city-name">City name</label>
          <input
            type="text"
            id="city-name"
            placeholder="Enter City Name"
            value={cityInput}
            onChange={event => setCityInput(event.target.value)}
          />
          <input type="submit" value="Add City" />
        </form>
      </div>
    </>
  )
}
