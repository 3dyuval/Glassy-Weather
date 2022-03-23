import axios from "axios"
import React from "react"
import { toast } from "react-tiny-toast"

export default function ManageWrapper(props) {

  async function handleAddCity(input) {
    try {
      const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${input}&days=3&aqi=no&alerts=no`)
      const store = await addCity(input)
      setCityList(store)
      toast.show(`${input} added`)
    } catch (err) {
      console.log(err)
      toast.show('city not found')
    }
  }

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { handleAddCity })
    }
  })

  return (
    <div className="add-city">
      {childrenWithProps}
    </div>
  )
}
