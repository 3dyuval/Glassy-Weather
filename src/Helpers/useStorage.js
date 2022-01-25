const LISTNAME = "cityList"

export default function useStorage() {
  const addCity = cityName => {
    const currentList = getCities()
    localStorage.setItem(
      LISTNAME,
      JSON.stringify([
        ...currentList,
        { name: cityName, id: currentList.length + 1 },
      ])
    )
  }

  const getCities = () => {
    return JSON.parse(localStorage.getItem(LISTNAME))
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
