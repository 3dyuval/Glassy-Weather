import React, { useState, useLayoutEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import "./Index.scss"
import useStorage from "./Hooks/useStorage"
import Header from "./Components/Layout/Header.component"
import NavBar from "./Components/Layout/NavBar.component"

import { ToastContainer } from 'react-tiny-toast';
import Carousel, { CarouselItem } from "./Components/Layout/Carousel.wrapper"
import City from "./Components/Layout/City.component"
import AddCityInput from "./Components/Layout/AddCityInput.component"
import useWeather from "./Hooks/useWeather"


export default function App() {

  const { setStorageConfig, getStorageConfig } = useStorage()
  const { weather, stats, isLoading, fetchWeather, graphic } = useWeather();

  const [config, setConfig] = useState(setStorageConfig())
  const [cityList, setCityList] = useState(getStorageConfig('cities'))
  const [currentCity, setCurrentCity] = useState('')



  useLayoutEffect(() => {
    document.title = `Weather in ${currentCity}`
    fetchWeather(currentCity)
  }, [currentCity])


  function handleUserConfig(newConfig) {
    const updated = setStorageConfig(newConfig)
    setConfig((previous) => updated)
  }

  useLayoutEffect(() => {
    if (!config) return
    if (config.settings.darkTheme === false) {
      document.body.className = "light";
    } else if (config.settings.darkTheme === true) {
      document.body.className = "dark";
    }
    setCityList(config.cities)
  }, [config]);


  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Header>
          <NavBar handleUserConfig={handleUserConfig} />
          <AddCityInput handleAddCity={handleUserConfig} />
        </Header>
        <Routes>
          <Route path='*' element={
            <Carousel
              cityList={cityList}
              setCurrentCity={setCurrentCity}
              graphic={graphic}>

              {cityList.map(city => (
                <CarouselItem key={city.id}>
                  <City key={city.id}
                    cityName={city.name}
                    stats={stats}
                    isLoading={isLoading}
                    weather={weather}
                  />
                </CarouselItem>)
              )}
            </Carousel>}
          />
        </Routes>
      </div>
    </Router>
  )
}
