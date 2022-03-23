import React, { useState, useLayoutEffect, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import "./Index.scss"
import Header from "./Components/Header/Header.component"
import NavBar from "./Components/NavBar/NavBar.component"
import { useLocalStorage, useGetWeather } from "./Hooks/"
import { ToastContainer } from 'react-tiny-toast';
import * as defaultData from './Data'
import Main from "./Components/Main/Main.page"
import Manage from "./Components/Manage/Manage.component"
import Modal from "./Components/Modal/Modal.wrapper"
import Configuration from "./Components/Manage/Configuration.component"

export default function App() {

  const { weather, getWeather, isLoading } = useGetWeather();
  const [cities, setCities] = useLocalStorage('cities', defaultData.DEFAULT_CITIES)
  const [config, setConfig] = useLocalStorage('stats', defaultData.DEFAULT_CONFIG)
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [darkMode, setDarkMode] = useState(config?.settings.darkMode ?? false)

  useLayoutEffect(() => {
    getWeather(selectedCity.name)
    document.title = `Weather in ${selectedCity}`
  }, [selectedCity])


  // //accepts {config: configValue}
  // function handleUserConfig(newConfig) {
  //   const updated = setStorageConfig(newConfig)
  //   setConfig((previous) => updated)
  // }

  // useLayoutEffect(() => {
  //   if (!config) return
  //   if (config.settings.darkMode === 'false') {
  //     document.body.className = "light";
  //   } else if (config.settings.darkMode === 'true') {
  //     document.body.className = "dark";
  //   }
  //   // setCities(config.cities)
  // }, [config]);


  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Header>
          <NavBar config={config} darkMode={darkMode} setDarkMode={setDarkMode} />
          {/* <AddCityInput handleUserConfig={handleUserConfig} /> */}
        </Header>
        <Routes>
          <Route path='*' element={<Main weather={weather} cities={cities} setSelectedCity={setSelectedCity} />} />
          <Route path="/manage/" element={<Manage
            config={config}
            setConfig={setConfig}
            cities={cities}
            setCities={setCities}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />}>
            <Route path="/manage/configuration" element={<Modal ><Configuration config={config} setConfig={setConfig} darkMode={darkMode} setDarkMode={setDarkMode} /></Modal>} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}


