import React, { useState, useLayoutEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ManageCities from "./Components/Layout/ManageCities.component"
import Header from "./Components/Layout/Header.component"
import Welcome from "./Components/Layout/Welcome.component"
import Main from "./Components/Layout/Main.component"
import "./Index.scss"
import useStorage from "./Hooks/useStorage"

export default function App() {
  const [theme, setTheme] = useState("light")

  const { getCities } = useStorage()
  const [cityList, setCityList] = useState(() => getCities())
  const [currentCity, setCurrentCity] = useState()

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
            <Main
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
