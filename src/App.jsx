import React, { useState, useLayoutEffect } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import "./Index.scss"
import useStorage from "./Hooks/useStorage"

import Manage from "./Components/Layout/Manage.page"
import Header from "./Components/Layout/Header.component"
import NavBar from "./Components/Layout/NavBar.component"
import Welcome from "./Components/Layout/Welcome.component"
import Weather from "./Components/Layout/Weather.component"
import Cities from "./Components/Data/withCities.wrapper"
import { ToastContainer } from 'react-tiny-toast';

export default function App() {

  const { getStorage, setUserConfig, getUserConfig, addCity } = useStorage()
  const [darkTheme, setDarkTheme] = useState(getUserConfig().config.darkMode)
  const [cityList, setCityList] = useState(getStorage("cityList"))
  const [currentCity, setCurrentCity] = useState()

  function handleAddCity(itm) {
    const cityListFromStorage = addCity(itm)
    setCityList(cityList => cityListFromStorage)
  }

  useLayoutEffect(() => {
    document.title = `Weather in ${currentCity}`
    //Todo - state containing 'weathercode'
    // and pass it down to <CurrentConditionGraphic>
  }, [currentCity])


  function handleThemeToggle() {
    setDarkTheme(!darkTheme)
  }

  useLayoutEffect(() => {
    if (darkTheme === false) {
      document.body.className = "light";
    } else if (darkTheme === true) {
      document.body.className = "dark";
    }
    setUserConfig({ darkMode: darkTheme })
  }, [darkTheme]);

  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Header>
          <NavBar handleThemeToggle={handleThemeToggle} darkTheme={darkTheme} />
        </Header>
        <Routes>
          <Route path="/manage" element={
            <Manage
              cityList={cityList}
              setCityList={setCityList}
            />}
          />
          <Route path='/welcome' element={
            <Cities>
              <Welcome
                cityList={cityList}
                handleAddCity={handleAddCity}
                setCityList={setCityList} />
            </Cities>
          } />
          <Route path='/weather' element={
            <Weather
              cityList={cityList}
              currentCity={currentCity}
              setCurrentCity={setCurrentCity}
            />}
            render={() => (cityList == undefined || !cityList.length) && <Redirect to="/welcome" />}

          />
        </Routes>
      </div>
    </Router>
  )
}
