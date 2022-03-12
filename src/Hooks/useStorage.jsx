const CITYLIST = "cityList"
const CONFIG = "configuration"

function useStorage() {

  const addCity = cityName => {
    const currentList = getStorage(CITYLIST)
    if (!currentList) {
      return localStorage.setItem(
        CITYLIST,
        JSON.stringify([
          { name: cityName, id: 0 },
        ])
      )
    }
    localStorage.setItem(
      CITYLIST,
      JSON.stringify([
        ...currentList,
        { name: cityName, id: currentList.length + 1 },
      ])
    )
  }

  const getStorage = (storageName) => {
    const saved = localStorage.getItem(storageName)
    const initialValue = JSON.parse(saved)
    return initialValue || []
  }

  const deleteCity = city => {
    const filteredList = getStorage(CITYLIST).filter(item => item.id !== city.id)
    if (!filteredList) return
    localStorage.setItem(CITYLIST, JSON.stringify(filteredList))
    return filteredList
  }

  const saveList = list => {
    localStorage.setItem(CITYLIST, JSON.stringify(list))
  }

  function setUserConfig(config) {
    const newConfig = { ...getUserConfig(), config }
    localStorage.setItem(CONFIG, JSON.stringify(newConfig))
  }

  function getUserConfig() {

    const defaultConfig = {
      stats: [{ name: "Temp", id: "temp_c", enabled: true },
      { name: "Feels like", id: "feelslike_c", enabled: true },
      { name: "Precipitation", id: "precip_mm", enabled: true },
      { name: "Humidity", id: "humidity", enabled: true },
      { name: "Windspeed", id: "wind_kph", enabled: true }],
      config: {
        darkMode: false
      }
    }
    const saved = getStorage(CONFIG);
    if (saved.length === 0) {
      return defaultConfig;
    }
    return saved
  }

  return { addCity, getStorage, deleteCity, saveList, getUserConfig, setUserConfig }
}


export default useStorage