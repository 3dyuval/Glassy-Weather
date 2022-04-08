import React, { useState, useReducer, useEffect, useLayoutEffect, useRef } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./Index.scss"
import * as defaultData from './constants'
import { useLocalStorage, useGetWeather } from "./Hooks/"
import { ToastContainer } from 'react-tiny-toast';
// components //
import Header from "./Components/Header/Header.component"
import NavBar from "./Components/Header/NavBar.component"
import Main from "./Components/Main/Main.page"
import Manage from "./Components/Manage/Manage.component"
import Modal from "./Components/Modal/Modal.wrapper"
import Configuration from "./Components/Manage/Configuration.component"
import { notifyUser } from "./utils"

/*
* Weather App  
* Yuval Dikerman
* yuval.glide.page
*/

const citiesActions = {
  ADD_CITY: "ADD_CITY",
  DELETE_CITY: "DELETE_CITY",
}

function citiesReducer(state, action) {
  switch (action.type) {
    case citiesActions.ADD_CITY: {
      //(validation of city name is done within the component)
      return [...state, {
        id: state.length,
        name: action.payload
      }]
    } case citiesActions.DELETE_CITY: {
      const newState = state.filter(city => city.id !== action.payload)
      return newState
    }
  }
}

function configReducer(state, action) {
  switch (action.type) {
    case 'add-stat': {
      const updatedStats = { stats: [...state.stats, { statName: action.payload }] }
      return { ...state.settings, ...updatedStats }
    }
    case 'remove-stat': {
      return { stats: state.stats.filter(itm => itm.statName != action.payload) }
    }
    case 'toggle': {
      if (!action.payload.checked) {
        notifyUser(action.payload.statName + ' removed')
        return { ...state, stats: state.stats.filter(itm => itm.statName !== action.payload.statName) }
      } else if (action.payload.checked) {
        notifyUser(action.payload.statName + ' added')
        return { ...state, stats: [...state.stats, { statName: action.payload.statName }] }
      }
    }
    default: {
      return state
    }
  }
}

export default function App() {
  const { fetchWeather, weather, isLoading, error } = useGetWeather(); // my custom hook 


  const [cities, dispatchCities] = useReducer(citiesReducer, [], () => {
    const storage = JSON.parse(localStorage.getItem("cities"))
    return storage || defaultData.DEFAULT_CITIES
  })

  const [selectedCity, setSelectedCity] = useState(() => cities[0].name || defaultData.DEFAULT_CITIES[0])

  const [config, dispatchConfig] = useReducer(configReducer, [], () => {
    const storage = JSON.parse(localStorage.getItem("config"))
    return storage || defaultData.DEFAULT_CONFIG
  })

  const [darkMode, setDarkMode] = useState(config?.settings?.darkMode ?? false)

  useLayoutEffect(() => {
    document.title = `Weather in ${selectedCity}`
  }, [selectedCity])


  // fetch weather data on when selecting a city
  useEffect(() => {
    fetchWeather(selectedCity)
  }, [selectedCity])



  useEffect(() => {
    if (!cities) return
    localStorage.setItem("cities", JSON.stringify(cities))
    localStorage.setItem("config", JSON.stringify(config))
  }, [cities, config])

  return (
    <Router>
      {/* <div className="cloud" ref={cloudRef}></div> */}
      <div className="app">
        <ToastContainer />
        <Header>
          <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        </Header>
        <Routes>
          <Route path='*' element={<Main weather={weather} cities={cities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} />} />
          <Route path="/manage/" element={<Manage citiesActions={citiesActions} cities={cities} dispatch={dispatchCities}
          />}>
            <Route path="/manage/configuration" element={<Modal ><Configuration config={config} dispatch={dispatchConfig} darkMode={darkMode} setDarkMode={setDarkMode} /></Modal>} />
          </Route>
        </Routes>
      </div>
    </Router>

  )
}


