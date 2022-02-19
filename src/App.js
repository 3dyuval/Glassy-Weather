import React, { useState, useLayoutEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ManageCities from "./Components/ManageCities.component"
import Header from "./Components/Header.component"
import Welcome from "./Components/Welcome.component"
import { Cities } from "./Components/Cities.component"
import "./Components/SCSS/App.scss"

export default function App() {
  const [currentCity, setCurrentCity] = useState()
  const [theme, setTheme] = useState("light")
  const [cityList, setCityList] = useState(() => {
    const saved = localStorage.getItem("cityList")
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  useLayoutEffect(() => {
    document.title = `Weather in ${currentCity}`
  }, [currentCity])

  const showWelcome = () => {
    if (!cityList || cityList.length === 0)
      return <Welcome cityList={cityList} setCityList={setCityList} />
  }

  return (
    <Router>
      <div className="app">
        <Header theme={theme} setTheme={setTheme} />
        <Switch>
          <Route path="/manage">
            <ManageCities cityList={cityList} setCityList={setCityList} />
          </Route>
          <Route>
            {showWelcome()}
            <Cities
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
