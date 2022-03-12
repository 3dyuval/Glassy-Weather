import React, { useState, useLayoutEffect, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import "./Index.scss"
import useStorage from "./Hooks/useStorage"

import ManageCities from "./Components/Layout/ManageCities.component"
import Header from "./Components/Layout/Header.component"
import NavBar from "./Components/Layout/NavBar"
import Welcome from "./Components/Layout/Welcome.component"
import Main from "./Components/Layout/Main.component"

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
        <Header>
          <NavBar handleThemeToggle={handleThemeToggle} darkTheme={darkTheme} />
        </Header>
        <Switch>
          <Route path="/manage">
            <ManageCities cityList={cityList} setCityList={setCityList} />
          </Route>
          <Route path='/welcome'>
          <Welcome
              cityList={cityList}
             handleAddCity={handleAddCity}
             setCityList={setCityList} />
          </Route>
          <Route>
          { cityList == undefined || !cityList.length ? <Redirect to="/welcome" /> :
            <Main
              handleAddCity={handleAddCity}
              cityList={cityList}
              setCityList={setCityList}
              currentCity={currentCity}
              setCurrentCity={setCurrentCity}
            />}
          </Route>
        </Switch>

      </div>
    </Router>
  )
}
