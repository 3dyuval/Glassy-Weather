import React, { useState, useReducer, useEffect, useLayoutEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useGetWeather, useColor } from "./Hooks/"
import { ToastContainer } from 'react-tiny-toast';
import * as defaultData from './constants'
import { ConfigProvider } from "./contextReducers"
import * as reducer from "./contextReducers" // TODO: refactor
import Main from "./Pages/Main"
import Manage from "./Pages/Manage/"

// components //
import Header from "./Components/Header/Header"
import NavBar from "./Components/Header/NavBar"
import Modal from "./Components/Modal/Modal"
import Configuration from "./Components/UserConfiguration/"
import "./Index.scss"
import Homepage from "./Pages/Homepage";


/*
* Weather App  
* Yuval Dikerman
* yuval.glide.page
*/


export default function App() {
  const { fetchWeather, weather, isLoading, error } = useGetWeather(); // my custom hook 
  const { updateColor } = useColor()

  const [cities, dispatchCities] = useReducer(reducer.cities, [], () => {
    const storage = JSON.parse(localStorage.getItem("cities"))
    return storage || defaultData.DEFAULT_CITIES
  })

  const [selectedCity, setSelectedCity] = useState(() => cities[0].name || defaultData.DEFAULT_CITIES[0])
  const [firstVisit, setFirstVisit] = useState(false)

  useEffect(() => {
    fetchWeather(selectedCity)
  }, [selectedCity])

  useEffect(() => {
    if (!weather) return
    console.log(weather)
    updateColor(weather.color.name)
  }, [weather])


  useLayoutEffect(() => {
    document.title = `Weather in ${selectedCity}`
  }, [selectedCity])

  //persist
  useEffect(() => {
    if (!cities) return
    localStorage.setItem("cities", JSON.stringify(cities))
  }, [cities])

  if (firstVisit) return (
    <ConfigProvider>
      <Homepage setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
    </ConfigProvider>
  )

  return (
    <Router>
      <ConfigProvider>
        <div className="app">
          <ToastContainer />
          <Header>
            <NavBar />
          </Header>
          <Routes>
            <Route path="/:city" element={<Homepage weather={weather} cities={cities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} />} />
            <Route exact path='/' element={<Main weather={weather} cities={cities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} />} />
            <Route path="/manage/" element={<Manage citiesActions={reducer.citiesActions} cities={cities} dispatch={dispatchCities}
            />}>
              <Route path="/manage/configuration" element={<Modal ><Configuration /></Modal>} />
            </Route>
          </Routes>
        </div>
      </ConfigProvider>
    </Router>

  )
}


