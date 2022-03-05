const LISTNAME = "cityList"

function useStorage() {




  const addCity = cityName => {
    const currentList = getCities()
    if (!currentList) {
      return localStorage.setItem(
        LISTNAME,
        JSON.stringify([
          { name: cityName, id: 0 },
        ])
      )
    }
    localStorage.setItem(
      LISTNAME,
      JSON.stringify([
        ...currentList,
        { name: cityName, id: currentList.length + 1 },
      ])
    )
  }

  const getCities = () => {
    const saved = localStorage.getItem(LISTNAME)
    const initialValue = JSON.parse(saved)
    return initialValue || []
  }

  const deleteCity = city => {
    const filteredList = getCities().filter(item => item.id !== city.id)
    if (!filteredList) return
    localStorage.setItem(LISTNAME, JSON.stringify(filteredList))
    return filteredList
  }

  const saveList = list => {
    localStorage.setItem(LISTNAME, JSON.stringify(list))
  }

  return { addCity, getCities, deleteCity, saveList }
}


export default useStorage