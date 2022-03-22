const defaultConfig = {
  stats: [{ name: "Temp", id: "temp_c", enabled: true },
  { name: "Feels like", id: "feelslike_c", enabled: true },
  { name: "Precipitation", id: "precip_mm", enabled: true },
  { name: "Humidity", id: "humidity", enabled: true },
  { name: "Windspeed", id: "wind_kph", enabled: true }],
  settings: {
    darkTheme: false
  },
  cities: 
  [ { name: "Tel Aviv", id: 0 } ]
}

function useStorage(CONFIG = "user-configuration") {

  function save(obj) {
    localStorage.setItem(CONFIG, JSON.stringify(obj))
  }

  function load(storageName) {
    const saved = localStorage.getItem(storageName)
    const loadedFromStorage = JSON.parse(saved)
    return loadedFromStorage || null
  }

//only checks if currentCityList empty or not and creates a new list
  function addCity(cityName) {
    const currentList = getStorageConfig('cities') 
    const newCity = { id: currentList.length, name: cityName  }

      if (!currentList.length) {
        return {cities: [newCity]}
      }

      return {cities: [ ...currentList, newCity]}
  }

  // only removes the key and updates the ID's
  function deleteCity(id) {
    const currentList = getStorageConfig('cities')
    if( currentList === null) return defaultConfig.cities

    const filtered = currentList.filter((itm, idx) =>  (id !== idx))
    const filteredAndOrdered = filtered.map((itm, idx) =>  ({name: itm.name, id: idx}))
    save(filteredAndOrdered)
    return filteredAndOrdered
  }
  
  function getStorageConfig(key) {
    const config = load(CONFIG);
    if (!key) {
       const userConfig =  config  ? config : defaultConfig
       return userConfig
      }

    else if (key) {
      const selectedConfigKey =  config  ? config[key] : defaultConfig[key]
      return selectedConfigKey
     }
  }

  function setStorageConfig(newConfig) {
    const currentConfig = getStorageConfig()
    if (!newConfig) {
      save(currentConfig)
      return currentConfig
    }
    const newAndUpdated = {...currentConfig,  ...newConfig }
    save( newAndUpdated )
    return newAndUpdated
  }


  return { load, addCity, deleteCity, getStorageConfig, setStorageConfig }
}


export default useStorage