import React, { useState, useLayoutEffect, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import ManageCities from "./Components/Layout/ManageCities.component"

import Header from "./Components/Layout/Header.component"
import NavBar from "./Components/Layout/NavBar"

import Welcome from "./Components/Layout/Welcome.component"
import Main from "./Components/Layout/Main.component"
import "./Index.scss"
import useStorage from "./Hooks/useStorage"



export default function App() {
  const { getStorage, setUserConfig, getUserConfig, addCity } = useStorage()
  const [darkTheme, setDarkTheme] = useState(getUserConfig().config.darkMode)
  // getStorage('cityList')
  const [cityList, setCityList] = useState([])
  const [currentCity, setCurrentCity] = useState()


  function handleAddCity(itm) {
    const cityListFromStorage = addCity(itm)
    console.log(cityListFromStorage)
    setCityList(cityListFromStorage)
  }


  useLayoutEffect(() => {
    document.title = `Weather in ${currentCity}`
  }, [currentCity])

  useEffect(() => {
    const storage = getStorage("cityList")
    setCityList(storage)
  }, [])

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
        <Header>
          <NavBar handleThemeToggle={handleThemeToggle} darkTheme={darkTheme} />
        </Header>
        <Switch>
          <Route path="/manage">
            <ManageCities cityList={cityList} setCityList={setCityList} />
          </Route>

          <Route>

            <Main
              handleAddCity={handleAddCity}
              cityList={cityList}
              setCityList={setCityList}
              currentCity={currentCity}
              setCurrentCity={setCurrentCity}
            />
          </Route>

        </Switch>

      </div>
    </Router>
  )
}
