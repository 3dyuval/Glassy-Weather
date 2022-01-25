import { cities } from "./fakeData"

export default function useFetch() {
  function getWeather(accessPoint, options) {
    const baseURL = "http://api.weatherapi.com/v1"
    const apiKey = "?key=f2227dce13864693a89165508211212"
    return fetch(baseURL + accessPoint + apiKey + options).then(response =>
      response.json()
    )
  }

  function fakeApi(ms, cityName) {
    const { telAviv, budapest } = cities()
    return new Promise(resolve => {
      setTimeout(() => {
        switch (cityName) {
          case "Tel Aviv":
            return resolve(telAviv)
          case "Budapest":
            return resolve(budapest)
        }
      }, ms)
    })
  }

  return { getWeather, fakeApi }
}

function handleWeatherUpdate() {
  try {
    setLoading(true)
    const accessPoint = "/forecast.json"
    const options = "&q=" + cityName + "&days=1"
    getWeather(accessPoint, options).then(data => {
      setWeather(data)
      setLoading(false)
    })
  } catch {
    err => console.log(err)
  }
}
